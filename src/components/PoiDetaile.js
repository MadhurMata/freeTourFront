import React, { Component } from 'react'
import TourNavigato from '../lib/tour-service'


export default class Poi extends Component {
  state = {
    id: this.props.id,
    poi: {},
  }

  getPoi = () => {
    TourNavigato.showTour(this.state.id)
      .then((poi) => {
        this.setState({
          poi: this.poi,
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
  }
  render() {
    const { poi } = this.state;
    return (
      <div className="card-container">
        <div className="card-img">
          <img src={image} alt=""/>
          
        </div>
        {/* <div className="card-info">
            <h1>{name}</h1>
            <h2>{city}</h2>
            <h2>Ranking</h2>
            <h2>Favorite</h2>
        </div> */}
      </div>
    )
  }
}