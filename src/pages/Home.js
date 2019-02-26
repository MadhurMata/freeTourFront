import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
class Home extends Component {
  render() {
    const { user } = this.props
    return (
      <div>
        <h1>Welcome {user.username}</h1>
      </div>
    )
  }
}

export default withAuth(Home);