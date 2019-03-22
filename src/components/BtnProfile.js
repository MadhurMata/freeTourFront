import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class BtnProfile extends Component {

  isUserProfile = () => {
    if (this.props.pathname.pathname !== "/user/profile") {
      return <img src="/images/profilewhitewhite.svg" alt="profile" />
    } else {
      return <img src="/images/profilewhite.svg" alt="profile" />
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
