import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider'
import userService from '../lib/user-service'
import {BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import Tour from '../components/Tour';
import BottomBar from '../components/BottomBar';

class Profile extends Component {
  state = {
    id: this.props.user.id,
    user: [],
    tours: []
  }

  componentDidMount() {
    console.log(this.props)
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
    const { image } = this.props.user;
    const { tours } = this.state
    const { user } = this.props
    return (
      <div>
        <div>
          <img src={user.image} alt=""/>
        </div>
        <h1>{username}'s Profile</h1>
        <Link to={`/user/profile/${user.id}/edit`}>Edit</Link>
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