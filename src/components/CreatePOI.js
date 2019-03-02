import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';

export default class CreatePOI extends Component {
  state = {
    spot: 1,
    title: "",
    image: "",
    description: "",
  }

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handlePoi = (e) =>{
    e.preventDefault();
    const {pushPoi} = this.props
    const {title, image, description} = this.state
    pushPoi({ pushPoi, title, image, description })
    const spot = this.state.spot +1;
    this.setState({
      spot,
      title: "",
      image: "",
      description: "",
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
            <button type="submit" value="submit">Save Tour</button>
          </div>
        </form>
      </div>
      <BottomBar data='data' />
    </div>
    )
  }
}
