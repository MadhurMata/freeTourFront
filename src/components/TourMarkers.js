import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import tourService from '../lib/tour-service'
import { element } from 'prop-types';


export default class TourMarkers extends Component {
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
          center: [data.POI[0].listOfPoi.lng, data.POI[0].listOfPoi.lat ],
          zoom: 12,
        };
        mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_KEY}`;
        const map = new mapboxgl.Map(mapConfig);
        this.geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        });
        map.addControl(this.geolocate);
        this.setState({
          tour: data,
          loading:false,
          map,
        })
      
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  componentDidMount() {
    this.getTours()
  }

  paintPoints = () => {
    const { tour } = this.state;
    if(tour.POI){
      for (let i = 0; i < tour.POI.length; i++){
        if(tour.POI[i].listOfPoi.lng){
            new mapboxgl.Marker({
              color:'#26c75fcc', 
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


