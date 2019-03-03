import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class BtnProfile extends Component {
  render() {
    return (
      <div>
        <Link to="/user/profile">
          <img src="../images/profile-button-white.svg" alt=""/>
        </Link>
      </div>
    );
  }
}
