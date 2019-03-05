import React, { Component } from "react";
import { withAuth } from "../components/AuthProvider";
import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";
import Tour from "../components/Tour";
import tourService from "../lib/tour-service";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import "bulma/css/bulma.css";
import Search from "../components/Search";

class Home extends Component {
  state = {
    searchedTours: [],
    tours: []
  };

  componentDidMount() {
    this.getTours(); // get data the first time
  }

  getTours = () => {
    tourService
      .getTours()
      // console.log('tours front end', this.state)
      .then(data => {
        this.setState({
          tours: data,
          searchedTours: data
        })
        }).catch(error => {
          console.log("error", error);
        });
  };

  filterItem = itemSearched => {
    console.log(itemSearched);
    const { tours } = this.state;
    const copyTours = [...tours];

    let toursFiltered = copyTours.filter(tour => {
      return tour.city.toLowerCase().search(itemSearched.toLowerCase()) !== -1;
    })
    this.setState({
      searchedTours: toursFiltered
    })
  };

  render() {
    const { user } = this.props;
    const { searchedTours, tours } = this.state;
    return (
      <div className="home-container">
        <div>
          <Navbar data="data" />
        </div>
        <div>
          <Search search={this.filterItem} />
        </div>

        <div className="tours-list">
          {searchedTours.map((tour, id) => {
            return (
              <Link to={`/tour/${tour._id}`}>
                <Tour
                  key={id}
                  image={tour.image}
                  name={tour.name}
                  city={tour.city}
                />
              </Link>
            );
          })}
        </div>
        <BottomBar path={this.props.match.path} data="data" />
      </div>
    );
  }
}

export default withAuth(Home);
