import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class BtnHome extends Component {
  render() {
    return (
      <div>
        <Link to="/"><img src="../images/home-button-solid.svg" alt=""/></Link>
      </div>
    )
  }
}
