import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class BtnHome extends Component {

isUserHome = () => {
  if (this.props.path.path !== "/"){
    return <img src="../images/home.png" alt="home"/>
  }else{
    return <img src="../images/blackhome.png" alt="home"/>
  }
}

  render() {
    console.log('boton props HOME', this.props)
    return (
      <div>
        <Link to="/">
        {this.isUserHome()}
        </Link>
      </div>
    );
  }
}

