import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { withAuth } from "../components/AuthProvider";
import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';
import Map from '../components/Map';


class CreatePOI extends Component {
  state = {
    spot: 1,
    title: "",
    image: "",
    description: "",
    redirect: false,
    listOfPoi: []

  }

  componentDidUpdate(){
    console.log(this.state.listOfPoi)
  }
  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handlePoi = (e) =>{
    e.preventDefault();
    const {pushPoi} = this.props
    console.log(this.props, "mis props")
    const {title, image, description, listOfPoi} = this.state
    if(!title || !image || !description){
      alert('hay campos vacios')
    }
    pushPoi({ pushPoi, title, image, description, listOfPoi})
    const spot = this.state.spot +1;
    this.setState({
      spot,
      title: "",
      image: "",
      description: "",
      listOfPoi: this.state.center
    })
  }
  handleParentSubmit = (e) => {
    e.preventDefault();
    const { _id, name, city, image, description, location, duration,POI,handleFormSubmit} = this.props 
    handleFormSubmit( _id, name, city, image, description, location, duration, POI)
  };

  handleBoth = (e) =>{
    this.handlePoi(e)
    this.handleParentSubmit(e)
    this.setState({
      redirect: true
    })
    console.log('saluditoooooooooooooooss', this.props)
  }

  receiveCenter = (center) => {
    this.setState({
      listOfPoi: center,
    })
    
  } 
  

  render() {
    return (
      <div>
      <Navbar data='data' />
      <div className="create-box">
        <h1>Spot {this.state.spot}</h1>
        <form className="flex-column-create" onSubmit={this.handleFormSubmit}>
          <div className="flex-create">
            <label for="inp" className="inp" >
              <input id="inp" type="text" name="title" placeholder="&nbsp;" value={this.state.title} onChange={this.handleChange}/>
              <span className="label">Title</span>
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
          <div className="create-btn">
            <button onClick={this.handlePoi}>Next</button>
            <button onClick={this.handleBoth}>Save Tour</button>
          </div>
        </form>
        <Map sendCenter={this.receiveCenter}/>

      </div>
      <BottomBar data='data' />
    </div>
    )
  }
}

export default withAuth(CreatePOI);
