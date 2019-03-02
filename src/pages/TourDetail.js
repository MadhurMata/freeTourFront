import React, { Component } from 'react'
import tourService from '../lib/tour-service'
import {BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import { withAuth } from '../components/AuthProvider'

class TourDetail extends Component {
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
      this.setState( {
        tour: tour
      })
    })
  }

  isOwner = () =>{
    const { tour } = this.state;
    if(tour.creator === this.props.user._id){
     return <Link to={`/tour/${tour._id}/edit`}>Edit</Link>
    }
  }
  
  render() {
    const {tour} = this.state;
    return (
      <div>
        <h1>{tour.name}</h1>
        <p>{tour.description}</p>
        {this.isOwner()}
        
      </div>
    )
  }
}

export default withAuth(TourDetail)