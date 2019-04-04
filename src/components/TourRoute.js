import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import tourService from '../lib/tour-service'


export default class TourRoute extends Component {
  state = {
    id: this.props.id,
    center: [],
    tour: [],
    loading: true,
    map: null,
  }
  
  componentDidMount() {
    this.getTours()
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
        const map = new mapboxgl.Map(mapConfig);
        this.getRoute(map, data);
        this.geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        });
        map.addControl(this.geolocate);
        this.setState({
          tour: data,
          loading: false,
          map,
        })

      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  getRoute(map, data) {
    const POI = data.POI
    if (POI.length > 1) {
      const listOfPoints = []
      for (let i = 0; i <= POI.length; i++) {
        if (i === 0) {
          listOfPoints.push(POI[i].listOfPoi.lng)
        } else if (i === POI.length) {
          listOfPoints.push(POI[i - 1].listOfPoi.lat)
        } else {
          listOfPoints.push([POI[i - 1].listOfPoi.lat + ';' + POI[i].listOfPoi.lng])
        }
      }
      const url =
        `https://api.mapbox.com/directions/v5/mapbox/walking/${listOfPoints}.json?steps=true&geometries=geojson&access_token=` + mapboxgl.accessToken;
      fetch(url)
        .then((response) => {
          response.json()
            .then((info) => {
              let data = info.routes[0];
              let route = data.geometry;
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
                    "line-color": "#97667b",
                    "line-width": 5
                  }
                });
              });
            })
            .catch(error => console.log(error.response));
        })
    }
  }

  paintPoints = () => {
    const { tour, map } = this.state;
    if (tour.POI) {
      for (let i = 0; i < tour.POI.length; i++) {
        if (tour.POI[i].listOfPoi.lng) {
          new mapboxgl.Marker({
            color: '#23d160',
          })
            .setLngLat([tour.POI[i].listOfPoi.lng, tour.POI[i].listOfPoi.lat])
            .addTo(map);
          new mapboxgl.Popup({
            closeOnClick: false,
          })
            .setLngLat([tour.POI[i].listOfPoi.lng, tour.POI[i].listOfPoi.lat])
            .setHTML(tour.POI[i].title)
            .addTo(map);
        }
      }
    }
  }


  render() {
    if (this.state.map) {
      this.paintPoints()
    }

    return (
      <div>
        <div className='map' id='map' ></div>
      </div>
    );
  }
}