import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
export default class Map extends Component {
  state = {
    center: [],
    
  }
  onDragEnd(marker) {
    var lngLat = marker.getLngLat();
    console.log(lngLat)
    this.props.sendCenter(lngLat)
      this.setState({
        center: [lngLat.lng, lngLat.lat]
      })
    }

  componentDidMount() {
    const mapConfig = {
      container: 'map',
      style: 'mapbox://styles/ismaeljaouhar/cjsxi2yln1ean1hmsrey6rsbx',
      center: [2.15, 41.39],
      zoom: 13,
    };
    mapboxgl.accessToken = "pk.eyJ1IjoiaXNtYWVsamFvdWhhciIsImEiOiJjanMzZDBobzYwaHZ0NDNwbXlhdHM5eDF2In0.PT_A0flp8x4mH78w-JOegA";
    this.map = new mapboxgl.Map(mapConfig);
    this.geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    
    this.map.addControl(this.geolocate);
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    })
    this.map.addControl(geocoder);
    geocoder.on('result', (result) => {
      const coordinateX = result.result.center[0];
      const coordinateY =result.result.center[1];
      this.createNewMarker(coordinateX,coordinateY);
    });
  }
  createNewMarker (coordinateX, coordinateY) {
    this.marker = new mapboxgl.Marker({name: 'a',anchor: 'center', color:'#97667b', draggable: true,})
    .setLngLat([coordinateX, coordinateY])
    .addTo(this.map);
    this.marker.on('dragend',() => this.onDragEnd(this.marker));
  }
  render() {
    return (
        <div>
          <div className ='map' id = 'map' ></div>
        </div>
    );
  }
}