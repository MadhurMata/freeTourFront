import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider'
import userService from '../lib/user-service'
import {BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import Tour from '../components/Tour';
import BottomBar from '../components/BottomBar';

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
    userService.getMyTours()
      .then((data) => {
        data.map((tour, id) => {
          return (
            <Link to={`/tour/${tour._id}`}>
              <Tour
                key={id}
                image={tour.image}
                name={tour.name}
              /></Link>
          );
        })
        this.setState({
          tours: data
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  
  render() {
    const { username } = this.props.user;
    const { tours } = this.state
    const { user } = this.props
    return (
      <div>
        <h1>{username}'s Profile</h1>
        <Link to={`/user/profile/${user._id}/edit`}>Edit</Link>
        {tours.map((tour, id) => {
        console.log(tours)
        return (
          <Link to={`/tour/${tour._id}`}>
            <Tour
              key={id}
              image={tour.image}
              name={tour.name}
            /></Link>
        );
      })}
      <BottomBar />
      </div>
    )
  }
}

export default withAuth(Profile);