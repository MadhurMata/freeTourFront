import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider'
import userService from '../lib/user-service'
import {Link} from 'react-router-dom';
import Tour from '../components/Tour';
import BottomBar from '../components/BottomBar';
import Navbar from '../components/Navbar';
import authService from '../lib/auth-service';
import firebase from "firebase";


class Profile extends Component {
  state = {
    _id: this.props.user._id,
    image: this.props.user.image,
    user: [],
    tours: []
  }

  componentDidMount() {
    this.getMyTours()
  }

  getMyTours = () => {
    userService.getMyTours()
      .then((data) => {
        this.setState({
          tours: data
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  handlelogOut = () =>{
    authService.logout()
  }

  setImage = () => {
    const { image } = this.state
    if (image === undefined) {
      return (<div>
        <img src="https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" alt="" />
      </div>)
    } else if (image !== undefined) {
      return (<div>
        <img src={image} alt="" />
      </div>)
    }
  }
  
  
  render() {
    const { username } = this.props.user;
    const { tours, _id } = this.state
    return (
      <div className="profileContainer">
        <Navbar />
        <div className="profileInfo">
          {this.setImage()}
          <h1 className="userName">{username}'s profile</h1>
          <Link to={`/user/profile/${_id}/edit`}>Edit</Link>
        </div>
        <h1 className="userName">My tours</h1>
        {tours.map((tour, id) => {
          return (
            <Link key={id} to={`/tour/${tour._id}`}>
              <Tour
                key={id}
                image={tour.image}
                name={tour.name} />
            </Link>
          );
        })}
        <form className={"logout"} onSubmit={this.handlelogOut}>
          <button>Log Out</button>
        </form>
        <BottomBar pathname={this.props.location.pathname} />
      </div>
    )
  }
}
export default withAuth(Profile);

const config = {
  apiKey: "AIzaSyAT4fqnXzcAI_su5wW4E-4r2bMqGzcWLwM",
  authDomain: "tour-me-181bb.firebaseapp.com",
  storageBucket: "gs://tour-me-181bb.appspot.com"
};
firebase.initializeApp(config);