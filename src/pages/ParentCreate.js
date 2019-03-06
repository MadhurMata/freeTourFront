import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import CreateTour from '../components/CreateTour';
import CreatePOI from '../components/CreatePOI';
import tourService from '../lib/tour-service'
import Map from '../components/Map';



export default class ParentCreate extends Component {
  state = {
    _id: "",
    stage: 0,
    name: "",
    image: "",
    city: "",
    description: "",
    location: "",
    duration: "",
    POI: [],
    redirect: false,
  }

  componentDidUpdate(){
    //console.log('mi array de pois funcionando',this.state.POI)
  }

  toggleForm = () =>{
    const { _id, name, city, image, description, location, duration,POI, stage } = this.state;
    if(stage === 0 ){
     return <CreateTour
     changeStage={this.changeStage} />
    } else if (stage === 1 ){
      return <CreatePOI 
      id={_id}
      name={name}
      image={image}
      city={city}
      description={description}
      location={location}
      duration={duration}
      POI={POI}
      pushPoi = {this.pushPoi}
      handleFormSubmit = {this.handleFormSubmit}
      />
    }
  }

  changeStage = (stage) => {
    this.setState({
      stage: stage.newStage,
      name: stage.name,
      image: stage.image,
      city: stage.city,
      description: stage.description,
      duration: stage.duration
    })
  }

  pushPoi = (poi) =>{
    const newPoi = this.state.POI
    newPoi.push(poi)
    this.setState({
      poi: newPoi
    })
  }

  handleFormSubmit = (event) => {
    tourService.create(this.state)
    .then((data) => {
      return data  })
    .then((data) => {
      const {_id, name, city, image, description, location, duration,POI } = data
      this.setState({
        _id, 
        name, 
        city, 
        image, 
        description, 
        location, 
        duration,
        POI,
        redirect: true
      })
      
    })
    .catch(error => console.log(error.response));
  };

  render() {
    const {POI} = this.state
    
      if(this.state.redirect){
      return <Redirect to={`/tour/${this.state._id}`} />;
    }
    else {
      return (
        <div className="container-POI">
          <h1>{this.state.name}</h1>
          {/* {POI.map((poi, index) => {
          return (
            <h1 key={index}>{poi.title}</h1>
            );
            })} */}
          {this.toggleForm()}
        </div>
      )
    }
  }
}
