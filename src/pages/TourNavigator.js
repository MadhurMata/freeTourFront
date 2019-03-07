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
    selectedPoi: null
  }

  getTour = () => {
    tourService.showTour(this.state.id)
      .then((tour) => {
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
    const { tour } = this.state;
    let poiSelected = tour.POI.filter((poi, index) => {
      if (index === id) {
        return poi;
      }
      return null;
    })
    if(this.state.selectedPoi){
      this.setState({
        selectedPoi: null
      })
    } else {
    this.setState({
      selectedPoi: poiSelected
    
    })
  }
  }


  render() {
    const { tour } = this.state;
    return (
      !this.state.loading ?
        <div className="container-tourNavigator">
          <Navbar data="data" />
          <TourRoute id={this.state.id} />
          <h2 className="tours-poi-h2">Points of interest</h2>
          <div className="tours-poi">
            {tour.POI.map((tour, id) => {
              return (
                <div key={id}>
                  <button className={"button-poi-detail"} onClick={() => { this.makeChange(id) }}>
                  <h3>{tour.title}</h3>
                  <img src={tour.image} alt="Tour img"></img></button>
                </div>
              );
            })}
          </div>
          {this.state.selectedPoi ? <PoiDetail poi={this.state.selectedPoi}></PoiDetail> : null}
          <BottomBar path={this.props.match.path} data="data" />
        </div>
        : <div>loading...</div>


    )
  }
}
