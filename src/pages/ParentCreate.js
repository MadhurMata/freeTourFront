import React, { Component } from 'react'
import CreateTour from '../components/CreateTour';
import CreatePOI from '../components/CreatePOI';


export default class ParentCreate extends Component {
  state = {
    stage: 0,
    name: "",
    image: "",
    city: "",
    description: "",
    location: "",
    duration: "",
    POI: [],
  }

  toggleForm = () =>{
    const { stage } = this.state;
    if(stage === 0 ){
     return <CreateTour
     changeStage={this.changeStage} />
    } else if (stage === 1 ){
      return <CreatePOI 
      pushPoi = {this.pushPoi}
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
    let newPoi = this.state.POI.push(poi)
    console.log(this.state.POI)
    this.setState({
      poi: newPoi
    })
  }
  render() {
    const {POI} = this.state
    console.log(this.state)
    return (
      <div>
        <h1>{this.state.name}</h1>
        {POI.map((poi, index) => {
           console.log(poi)
         return (
          <h1 key={index}>{poi.title}</h1>
          );
          })}
        {this.toggleForm()}
      </div>
    )
  }
}
