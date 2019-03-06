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
          style: 'mapbox://styles/ismaeljaouhar/cjsu6nqjy4krf1fn7qmru3zrr',
          center: [2.15, 41.39],
          zoom: 13,
        };
        mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_KEY}`;
        this.map = new mapboxgl.Map(mapConfig);
        this.setState({
          map: this.map,
        })
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


