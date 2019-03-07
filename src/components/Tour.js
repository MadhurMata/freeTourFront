import React, { Component } from 'react'

export default class Tour extends Component {

  render() {
    const { name, image, city } = this.props;
    return (
      <div className="card-container">
        <div className="card-img">
          <img src={image} alt=""/>
          <div className={"cardsText"}>
            <h1>{name}</h1>
            <h2>{city}</h2>
          </div>
        </div>
      </div>
    )
  }
}
