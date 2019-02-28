import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import Navbar from '../components/Navbar';
class Home extends Component {
  render() {
    const { user } = this.props
    return (
      <div>
        <Navbar data='data' />
        <h1>Welcome {user.username}</h1>
      </div>
    )
  }
}

export default withAuth(Home);