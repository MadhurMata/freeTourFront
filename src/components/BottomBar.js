import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import BtnHome from '../components/BtnHome';
import BtnCreate from '../components/BtnCreate';
import BtnProfile from '../components/BtnProfile';

class Bottombar extends Component {

  render() {
    const { isLogged } = this.props;

    if (isLogged) {
      return <div className="bottombar">
        <div>
          <BtnHome path={this.props}/>
          <BtnCreate /> 
          <BtnProfile pathname={this.props}/>
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