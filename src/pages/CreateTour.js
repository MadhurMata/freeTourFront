import React, { Component } from "react";
import tourService from "../lib/tour-service";

export default class CreateTour extends Component {
  state = {
    name: "",
    image: "",
    city: "",
    description: "",
    location: "",
    duration: "",
    POI: []
  };

  handleFormSubmit = event => {
    event.preventDefault();
    tourService
      .create(this.state)
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(error => console.log(error.response));
  };

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="create-box">
        <form className="flex-column" onSubmit={this.handleFormSubmit}>
          <label for="inp" class="inp">
            <input type="text" id="inp" placeholder="&nbsp;" />
            <span class="label">Label</span>
            <span class="border" />
          </label>

          <div className="flex-create">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="flex-create">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </div>
          <div className="flex-create">
            <label>Image:</label>
            <input
              type="text"
              name="image"
              value={this.state.image}
              onChange={this.handleChange}
            />
          </div>
          <div className="flex-create">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className="flex-create">
            <label>Duration:</label>
            <input
              type="text"
              name="duration"
              value={this.state.duration}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" value="submit">
            Add tour
          </button>
        </form>
      </div>
    );
  }
}
