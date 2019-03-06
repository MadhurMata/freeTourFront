import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class BtnProfile extends Component {

  isUserProfile = () => {
  if (this.props.pathname.pathname !== "/user/profile"){
    return <img src="/images/profile-button-white.svg" alt="profile"/>
  }else{
    return <img src="/images/profile-button-solid.svg" alt="profile"/>
  }
}
  
  render() {
    return (
      <div>
        <Link to="/user/profile">
          {this.isUserProfile()}
        </Link>
      </div>
    );
  }
}
