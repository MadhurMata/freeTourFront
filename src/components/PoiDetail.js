import React, { Component } from 'react'

export default class Poi extends Component {

  render() {
    const poi = this.props.poi[0];
    return (
      <div className="popup-container">
        <img src={poi.image} alt="" />
        <div className="popup-info">
          <h1>{poi.title}</h1>
          <h2>{poi.city}</h2>
          <p>{poi.description}</p>
        </div>
      </div>
    )
  }
}

