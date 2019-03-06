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
          style: 'mapbox://styles/ismaeljaouhar/cjsu6nqjy4krf1fn7qmru3zrr',
          center: [2.15, 41.39],
          zoom: 13,
        };
        mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_KEY}`;
        this.map = new mapboxgl.Map(mapConfig);
        this.setState({
          map: this.map,
        })
        this.getRoute(this.map);
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

  getRoute(map) {
    const { tour } = this.state
    var url =
      `https://api.mapbox.com/directions/v5/mapbox/cycling/2.154007%2C41.390205%3B2.132000%2C41.380000%3B2.153007%2C41.390105%3B2.151007%2C41.390005.json?steps=true&geometries=geojson&access_token=` + mapboxgl.accessToken;
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
                  "line-color": "#0000ff",
                  "line-width": 7
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
              name: 'HOLA',
              color:'red', 
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
    // if(this.state.map) {
    //   this.paintPoints();
    // }
    
    return (
      <div>
        <div className='map' id='map' ></div>
      </div>
    );
  }
}





