import React, { Component } from 'react'
import TourRoute from "../components/TourRoute";
import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";
import tourService from '../lib/tour-service';
import { BrowserRouter as Link } from "react-router-dom";




export default class TourNavigation extends Component {
  state = {
    id: this.props.match.params.id,
    tour: {},
    loading: true,
    showing: true
  }

  getTour = () => {
    tourService.showTour(this.state.id)
      .then((tour) => {
        console.log(tour)
        this.setState ({
          tour,
          loading:false,
        })
      })
      .catch((error) => {
      console.log('error', error);
  })
  }
  componentDidMount() {
      this.getTour();
  }

  makeChange() {
    const {showing} = this.state;
    this.setState({
      showing : false,
    })
  }


  render() {
    const { tour } = this.state;
    console.log(tour.POI)
    return (
      !this.state.loading ?
      <div>
        {console.log('cargado', tour.POIF)}
        <Navbar data="data" />
        <TourRoute id={this.state.id}/>
        <div className="tours-list">

          {tour.POI.map((tour, id) => {
            return (
              <Link to={`/tour/${tour.id}/n`}>
              <div onClick={this.makeChange()}>
              {this.state.showing ? }
              <h3>{tour.title}</h3>
              <img src={tour.image}></img>
              </div>
              </Link>
            );
          })}
        </div>
        <BottomBar path={this.props.match.path} data="data" />

      </div>

:

<div>loading...</div>


    )
  }
}
