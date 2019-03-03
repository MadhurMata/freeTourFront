import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import BtnHome from '../components/BtnHome';

class Bottombar extends Component {
  render() {
    const { isLogged, user, logout } = this.props;
    const { username } = user;
    if (isLogged) {
      return <div className="bottombar">
        <div>
          <BtnHome />
          <img src="../images/plus-button.svg" alt=""/>
          <img src="../images/profile-button-white.svg" alt=""/>
        </div>
      </div>

    } else {
      return <div>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div>
    }
  
  }
}

export default withAuth(Bottombar);