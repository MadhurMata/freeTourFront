import React, { Component } from 'react'
import TourRoute from "../components/TourRoute";
import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";
import PoiDetail from "../components/PoiDetail";
import tourService from '../lib/tour-service';




export default class TourNavigation extends Component {
  state = {
    id: this.props.match.params.id,
    tour: {},
    loading: true,
    selectedPoi: {}
  }

  getTour = () => {
    tourService.showTour(this.state.id)
      .then((tour) => {
        console.log(tour)
        this.setState({
          tour,
          loading: false,
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
  }
  componentDidMount() {
    this.getTour();
  }

  makeChange(id) {
    const { tour } = this.state
    let poiSelected = tour.POI.filter((poi, index) => {
      if (index === id) {
        return poi;
      }
    })

    this.setState({
      selectedPoi: poiSelected
    })

  }


  render() {
    const { tour } = this.state;
    // console.log(tour.POI)
    return (
      !this.state.loading ?
        <div>
          <Navbar data="data" />
          <TourRoute id={this.state.id} />
          <h2>Points of interest</h2>
          <div className="tours-poi">
            {tour.POI.map((tour, id) => {
              return (
                <div key={id}>

                  <button onClick={() => { this.makeChange(id) }}>
                  <h3>{tour.title}</h3>
                  <img src={tour.image}></img></button>
                </div>
              );
            })}
          </div>
          <PoiDetail poi={this.state.selectedPoi}>
          </PoiDetail>

          <BottomBar path={this.props.match.path} data="data" />
        </div>
        : <div>loading...</div>


    )
  }
}
