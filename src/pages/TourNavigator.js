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

  componentDidMount() {
    this.getTour();
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

  makeChange(id) {
    const { tour, selectedPoi } = this.state;
    let poiSelected = tour.POI.filter((poi, index) => {
      if (index === id) {
        return poi;
      }
      return null;
    })
    if (selectedPoi) {
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
    const { tour, loading, id, selectedPoi } = this.state;
    const { path } = this.props.match
    return (
      !loading ?
        <div className="container-tourNavigator">
          <Navbar data="data" />
          <TourRoute id={id} />
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
          {selectedPoi ? <PoiDetail poi={selectedPoi}></PoiDetail> : null}
          <BottomBar path={path} data="data" />
        </div>
        : <div>loading...</div>
    )
  }
}
