import React, { Component } from 'react'
import { Link } from 'react-router-dom';



export default class Search extends Component {

  searchTour = (e) => {
    const { search } = this.props;
    search(e.target.value);
    
  }

  render() {
    return (
        <div className="box">
          <div className="field has-addons">
              <div className="control is-expanded">
                  <input className="input has-text-centered" type="search" placeholder="» » » » » » find a tour « « « « « «" onChange={ this.searchTour } />
              </div>
              <div className="control">
                  <Link className="button is-info" to="#" ><i  class="fas fa-search" ></i></Link>
              </div>
          </div>
        </div>
    )
  }
}