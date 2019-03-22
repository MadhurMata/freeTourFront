import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';

class Navbar extends Component {
  
  render() {
    const { isLogged } = this.props;
    if (isLogged) {
      return <div className="navbar">
        <h1>Tour.me</h1>
      </div>

    } else {
      return <div>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div>
    }
  }
}

export default withAuth(Navbar);