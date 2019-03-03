import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';
import Tour from '../components/Tour';
import tourService from '../lib/tour-service'
import {BrowserRouter as Router, Switch, Link} from 'react-router-dom';



class Home extends Component {
  state = {
    tours: []
  }

  componentDidMount() {
    this.getTours(); // get data the first time
  }
 
  getTours = () => {
    tourService.getTours()
    // console.log('tours front end', this.state)
    .then(( data ) => {
      this.setState({
        tours: data
      })
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  render() {
    const { user } = this.props;
    const { tours } = this.state;
    return (
      <div>
        <div>
         <Navbar data='data' />
        </div>
        <div className="clear"></div>
        <div>
         {tours.map((tour, id) => {
           console.log(tours)
         return (
           <Link to={`/tour/${tour._id}`}>
           <Tour
             key={id}
             image={tour.image}
             name={tour.name}
             city={tour.city}
           /></Link>
          );
          })}
        </div >
        <BottomBar data='data' />
      </div>
    )
  }
}

export default withAuth(Home);
