import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class BtnCreate extends Component {
  render() {
    return (
      <div>
        <Link to="/tour/create">
          <img src="/images/plusbuttonwhite.svg" alt=""/>
        </Link>
      </div>
    );
  }
}
