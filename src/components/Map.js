import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic21peWFrYXdhIiwiYSI6ImNqcGM0d3U4bTB6dWwzcW04ZHRsbHl0ZWoifQ.X9cvdajtPbs9JDMG-CMDsA";

getRoute(map) {
  var start = [2.154007, 41.390205];
  var url =
    `https://api.mapbox.com/directions/v5/mapbox/cycling/2.154007%2C41.390205%3B2.132000%2C41.380000%3B2.153007%2C41.390105%3B2.151007%2C41.390005.json?steps=true&geometries=geojson&access_token=` + mapboxgl.accessToken;
  fetch(url)
    .then((response) => {
      response.json()
        .then((data) => {
          var data = data.routes[0];
          var route = data.geometry;
          console.log(route)
          map.on('load', function () {
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
                "line-color": "#888",
                "line-width": 8
              }
            });
          });
        })
    })
}

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    this.handleViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  

  mapboxgl.accessToken = "pk.eyJ1IjoiaXNtYWVsamFvdWhhciIsImEiOiJjanMzZDBobzYwaHZ0NDNwbXlhdHM5eDF2In0.PT_A0flp8x4mH78w-JOegA";

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  this.getRoute(this.map);
  
  this.geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
  });
  this.map.addControl(this.geolocate);
  this.map.addControl(new mapboxgl.NavigationControl)
  this.map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
    }));
}

  render() {
    const { viewport, searchResultLayer } = this.state;

  return ( 
  <div className ='map'
    id = 'map' ></div>
  );
}

render(<App />, document.getElementById("root"));