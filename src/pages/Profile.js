import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider'
import tourService from '../lib/tour-service'
import {BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import Tour from '../components/Tour';

class Profile extends Component {
  state = {
    id: this.props.match.params.id,
    user: [],
    tours: []
  }

  componentDidMount() {
    this.getMyTours()
  }

  getMyTours = () => {
    tourService.getMyTours()
      .then((data) => {
        console.log(data)
        this.setState({
          tours: data
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  // getMyTours = () => {
  //   const { _id } = this.props.user;
  //   const { tours } = this.state;
  //   console.log(tours)
  //     tours.map((tour, id) => {
  //       console.log(tours)
  //       return (
  //         <Link to={`/tour/${tour._id}`}>
  //           <Tour
  //             key={id}
  //             image={tour.image}
  //             name={tour.name}
  //           /></Link>
  //       );
  //     })
  //   }
  
  render() {
    const { username } = this.props.user;
    return (
      <div>
        <h1>{username}'s Profile</h1>

      </div>
    )
  }
}

export default withAuth(Profile);