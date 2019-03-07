import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import tourService from '../lib/tour-service'
import { element } from 'prop-types';


export default class TourRoute extends Component {
  state = {
    id: this.props.id,
    center: [],
    tour: [],
    loading: true,
    map: null,
  }

  getTours = () => {
    tourService.showTour(this.state.id)
      .then((data) => {
        const mapConfig = {
          container: 'map',
          style: 'mapbox://styles/ismaeljaouhar/cjsxi2yln1ean1hmsrey6rsbx',
          center: [data.POI[0].listOfPoi.lng, data.POI[0].listOfPoi.lat],
          zoom: 12,
        };
        mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_KEY}`;
        this.map = new mapboxgl.Map(mapConfig);
        this.setState({
          map: this.map,
        })
        this.getRoute(this.map, data);
        this.geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        });
        this.map.addControl(this.geolocate);
        this.setState({
          tour: data,
          loading:false,
          map: this.map,
        })
      
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  getRoute(map, data) {
    const POI  = data.POI
    const listOfPoints = []
    for (let i = 0; i <= POI.length; i++) {
      if (i === 0) {
        listOfPoints.push(POI[i].listOfPoi.lng)
      } else if (i === POI.length) {
        listOfPoints.push(POI[i-1].listOfPoi.lat)
      } else {
        listOfPoints.push([POI[i-1].listOfPoi.lat+';'+POI[i].listOfPoi.lng])
      }
    }
    var url =
      `https://api.mapbox.com/directions/v5/mapbox/walking/${listOfPoints}.json?steps=true&geometries=geojson&access_token=` + mapboxgl.accessToken;
    fetch(url)
      .then((response) => {
        response.json()
          .then((data) => {
            var data = data.routes[0];
            var route = data.geometry;
            map.on('load', () => {
              map.addLayer({
                "id": "route",
                "type": "line",
                "source": {
                  "type": "geojson",
                  "data": {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                      "type": "LineString",
                      "coordinates": route.coordinates
                    }
                  }
                },
                "layout": {
                  "line-join": "round",
                  "line-cap": "round"
                },
                "paint": {
                  "line-color": "#FF0080",
                  "line-width": 5
                }
              });
            });
          })
      })
  }
  componentDidMount() {
    this.getTours()
  }

  paintPoints = () =>{
    const { tour } = this.state;
    if(tour.POI){
      for (let i = 0; i < tour.POI.length; i++){
        if(tour.POI[i].listOfPoi.lng){
            new mapboxgl.Marker({
              color:'#23d160', 
            })
            .setLngLat([ tour.POI[i].listOfPoi.lng, tour.POI[i].listOfPoi.lat ])
            .addTo(this.state.map);
            new mapboxgl.Popup({
              closeOnClick: false,
            })
            .setLngLat([ tour.POI[i].listOfPoi.lng, tour.POI[i].listOfPoi.lat ])
            .setHTML(tour.POI[i].title)
            .addTo(this.state.map);
        }
      }
    }
  }

  
  render() {
    if(this.state.map){
      this.paintPoints()
    }
    
    return (
      <div>
        <div className='map' id='map' ></div>
      </div>
    );
  }
}





