import React, { Component } from 'react'
import tourService from '../lib/tour-service'
import {BrowserRouter as Router, Switch, Link} from 'react-router-dom';

export default class TourDetail extends Component {
  state = {
    id: this.props.match.params.id,
    tour: {}
  }

  componentDidMount(){
    this.showTour();
  }
  showTour = () => {
    tourService.showTour(this.state.id)
    .then((tour) => {
      console.log('hgfvjhhjnh', tour)
      this.setState( {
        tour: tour
      })
    })
  }
  
  render() {
    const {tour} = this.state;

    return (
      <div>
        <h1>{tour.name}</h1>
        <p>{tour.description}</p>
        <Link to={`/tour/${tour._id}/edit`}>Edit</Link>
      </div>
    )
  }
}
