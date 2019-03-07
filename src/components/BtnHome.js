import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class BtnHome extends Component {

isUserHome = () => {
  if (this.props.path.path !== "/"){
    return <img src="/images/solidhome.svg" alt="home"/>
  }else{
    return <img src="/images/homeSolid.svg" alt="home"/>
  }
}

  render() {
    return (
      <div>
        <Link to="/">
        {this.isUserHome()}
        </Link>
      </div>
    );
  }
}

