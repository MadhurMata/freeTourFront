import React, { Component } from 'react'
import tourService from '../lib/tour-service.1'

export default class CreateTour extends Component {
  state = {
    name: "",
    image: "",
    city: "",
    description: "",
    location: "",
    duration: "",
    POI: []
  }

  handleFormSubmit = event => {
    event.preventDefault();
    tourService.create(this.state)
    .then((data) => {
      console.log(data)
    })
    .catch(error => console.log(error.response));
  };
 
   handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label >Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
          <label >Image:</label>
          <input type="text" name="image" value={this.state.image} onChange={this.handleChange}/>
          <label >City:</label>
          <input type="text" name="city" value={this.state.city} onChange={this.handleChange}/>
          <label >Description:</label>
          <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
          <label >Duration:</label>
          <input type="text" name="duration" value={this.state.duration} onChange={this.handleChange}/>
          <label >POI:</label>
          <input type="text" name="POI" value={this.state.POI} onChange={this.handleChange}/>
          <button type="submit" value="submit">Add tour</button>
        </form>
      </div>
    )
  }
}
