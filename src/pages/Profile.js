import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider'
import userService from '../lib/user-service'
import {Link} from 'react-router-dom';
import Tour from '../components/Tour';
import BottomBar from '../components/BottomBar';
import Navbar from '../components/Navbar';

class Profile extends Component {
  state = {
    _id: this.props.user._id,
    image: this.props.user.image,
    user: [],
    tours: []
  }

  componentDidMount() {
    console.log(this.props.user)
    console.log(this.props.user.image)
    this.getMyTours()
  }

  getMyTours = () => {
    userService.getMyTours()
      .then((data) => {
        // data.map((tour, id) => {
        //   return (
        //     <Link to={`/tour/${tour._id}`}>
        //       <Tour
        //         key={id}
        //         image={tour.image}
        //         name={tour.name}
        //       /></Link>
        //   );
        // })
        this.setState({
          tours: data
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  setImage = () => {
    if(this.props.user.image === undefined){
      return( <div>
        <img src="https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" alt=""/>
      </div>)
    } else if (this.props.user.image !== undefined){
      return( <div>
                <img src={this.state.image} alt=""/>
              </div>)
    }
    
  }
  
  render() {
    const { username } = this.props.user;
    const { tours } = this.state
    return (
      <div className="profileContainer">
        <Navbar/>
        <div className="profileInfo">
          {this.setImage()}
          <h1>{username}'s Profile</h1>
          <Link to={`/user/profile/${this.state._id}/edit`}>Edit</Link>
        </div>
        {tours.map((tour, id) => {

        return (
          <Link to={`/tour/${tour._id}`}>
            <Tour
              key={id}
              image={tour.image}
              name={tour.name}/>
          </Link>
          );
        })}
        <BottomBar pathname={this.props.location.pathname}/>
      </div>
    )
  }
}

export default withAuth(Profile);