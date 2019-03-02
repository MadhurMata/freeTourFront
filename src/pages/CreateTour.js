import React, { Component } from 'react'
import tourService from '../lib/tour-service'
import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';

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
      return data  })
    .catch(error => console.log(error.response));
  };

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <Navbar data='data' />
        <div className="create-box">
          <h1>New tour</h1>
          <form className="flex-column-create" onSubmit={this.handleFormSubmit}>
            <div className="flex-create">
              <label for="inp" class="inp" >
                <input id="inp" type="text" name="name" placeholder="&nbsp;" value={this.state.name} onChange={this.handleChange}/>
                <span class="label">Name</span>
                <span class="border"></span>
              </label>
            </div>
            <div className="flex-create">
              <label for="inp" class="inp" >
                <input id="inp" type="text" name="city" placeholder="&nbsp;" value={this.state.city} onChange={this.handleChange}/>
                <span class="label">City</span>
                <span class="border"></span>
              </label>
            </div>
            <div className="flex-create">
              <label for="inp" class="inp" >
                <input id="inp" type="text" name="image" placeholder="&nbsp;" value={this.state.image} onChange={this.handleChange}/>
                <span class="label">Image</span>
                <span class="border"></span>
              </label>
            </div>
            <div className="flex-create">
              <label for="inp" class="inp" >
                <input id="inp" type="text" name="description" placeholder="&nbsp;" value={this.state.description} onChange={this.handleChange}/>
                <span class="label">Description</span>
                <span class="border"></span>
              </label>
            </div>
            <div className="flex-create">
              <label for="inp" class="inp" >
                <input id="inp" type="text" name="duration" placeholder="&nbsp;" value={this.state.duration} onChange={this.handleChange}/>
                <span class="label">Duration</span>
                <span class="border"></span>
              </label>
            </div>
            <div className="create-btn">
              <button type="submit" value="submit">Add tour</button>
              <button>Next</button>
            </div>
            
          </form>
        </div>
        <BottomBar data='data' />
      </div>
    )
  }
}
