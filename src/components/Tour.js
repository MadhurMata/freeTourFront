import React, { Component } from 'react'
import tourService from '../lib/tour-service'



export default class Tour extends Component {
  // state = {
  //   id: this.props.match.params.id,
  //   tour: {},
  // }

  // componentDidMount(){
  //   this.showTour();
  // }
  // showTour = () => {
  //   tourService.showTour(this.state.id)
  //   .then((tour) => {
  //     this.setState( {
  //       tour: tour
  //     })
  //   })
  // }
  render() {
    const { name, image } = this.props;
    console.log(name)
    return (
      <div className="card-container">
        <div className="card-img">
          <img src={image} alt=""/>
        </div>
        <div className="card-name">
          <h1>{name}</h1>
        </div>
      </div>
    )
  }
}
