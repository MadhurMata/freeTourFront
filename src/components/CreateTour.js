import React, { Component } from "react";
import tourService from "../lib/tour-service";
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

  handleStage = (e) => {
    e.preventDefault()
    const {changeStage} = this.props;
    const { name, image, city, description, duration } =this.state
    const newStage = 1
   changeStage({newStage, name, image, city, description, duration})
  }

  render() {
    return (
      <div>
        <Navbar data='data' />
        <div className="create-box">
          <h1>New tour</h1>
          <form className="flex-column-create" onSubmit={this.handleFormSubmit}>
            <div className="flex-create">
              <label for="inp" className="inp" >
                <input id="inp" type="text" name="name" placeholder="&nbsp;" value={this.state.name} onChange={this.handleChange}/>
                <span className="label">Name</span>
                <span className="border"></span>
              </label>
            </div>
            <div className="flex-create">
              <label for="inp" className="inp" >
                <input id="inp" type="text" name="city" placeholder="&nbsp;" value={this.state.city} onChange={this.handleChange}/>
                <span className="label">City</span>
                <span className="border"></span>
              </label>
            </div>
            <div className="flex-create">
              <label for="inp" className="inp" >
                <input id="inp" type="text" name="image" placeholder="&nbsp;" value={this.state.image} onChange={this.handleChange}/>
                <span className="label">Image</span>
                <span className="border"></span>
              </label>
            </div>
            <div className="flex-create">
              <label for="inp" className="inp" >
                <input id="inp" type="text" name="description" placeholder="&nbsp;" value={this.state.description} onChange={this.handleChange}/>
                <span className="label">Description</span>
                <span className="border"></span>
              </label>
            </div>
            <div className="flex-create">
              <label for="inp" className="inp" >
                <input id="inp" type="text" name="duration" placeholder="&nbsp;" value={this.state.duration} onChange={this.handleChange}/>
                <span className="label">Duration</span>
                <span className="border"></span>
              </label>
            </div>
            <div className="create-btn">
              <button onClick={this.handleStage} >Next</button>
            </div>
            
          </form>
        </div>
        <BottomBar data='data' />
      </div>
    );
  }
}
