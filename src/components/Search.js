import React, { Component } from 'react'


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
                  <a className="button is-info"><i class="fas fa-search"></i></a>
              </div>
          </div>
        </div>
    )
  }
}