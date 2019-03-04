import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import tourService from '../lib/tour-service'

export default class Map extends Component {
  state = {
    center: [],
    tours: []
  }


  componentDidUpdate() {
    console.log('this tours', this.state.tours)
  }

  getTours = () => {
    tourService.getTours()
      // console.log('tours front end', this.state)
      .then((data) => {
        console.log("data in map", data)
        this.setState({
          tours: data,
        }, () => {
          const mapConfig = {
            container: 'map',
            style: 'mapbox://styles/ismaeljaouhar/cjsu6nqjy4krf1fn7qmru3zrr',
            center: [2.15, 41.39],
            zoom: 13,
          };
          mapboxgl.accessToken = "pk.eyJ1IjoiaXNtYWVsamFvdWhhciIsImEiOiJjanMzZDBobzYwaHZ0NDNwbXlhdHM5eDF2In0.PT_A0flp8x4mH78w-JOegA";
          this.map = new mapboxgl.Map(mapConfig);
          this.getRoute(this.map);
          this.geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true
          });

          this.map.addControl(this.geolocate);


        })
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  getRoute(map) {
    const { tours } = this.state
    console.log("mis tours in map", tours)
    const lat = tours[10].POI[0].listOfPoi.lat
    const lon = tours[10].POI[0].listOfPoi.lon
   
    var url =
      'https://api.mapbox.com/directions/v5/mapbox/cycling/'+lat+ ',' + lon + '%3B2.154007%2C41.390205%3B2.132000%2C41.380000%3B2.153007%2C41.390105%3B2.151007%2C41.390005.json?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
    fetch(url)
      .then((response) => {
        response.json()
          .then((data) => {
             data = data.routes[0];
            var route = data.geometry;
            console.log(route)
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


  createNewMarker(coordinateX, coordinateY) {
    this.marker = new mapboxgl.Marker({ name: 'a', anchor: 'center', color: 'red', draggable: true, })
      .setLngLat([coordinateX, coordinateY])
      .addTo(this.map);
    this.marker.on('dragend', () => this.onDragEnd(this.marker));
  }
  render() {
    return (
      <div>
        <div className='map' id='map' ></div>
      </div>
    );
  }
}





