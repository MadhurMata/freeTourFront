import React, { Component } from 'react'


export default class Search extends Component {

  searchTour = (e) => {
    const { search } = this.props;
    search(e.target.value);
    
  }

  render() {
    return (
        <div class="box">
          <div class="field has-addons">
              <div class="control is-expanded">
                  <input class="input has-text-centered" type="search" placeholder="» » » » » » find me « « « « « «" onChange={ this.searchTour } />
              </div>
              <div class="control">
                  <a class="button is-info">Search</a>
              </div>
          </div>
        </div>
    )
  }
}