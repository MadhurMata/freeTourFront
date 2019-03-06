import React, { Component } from 'react';
import { withAuth } from "../components/AuthProvider";
import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';
import Map from '../components/Map';
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import firebase from "firebase";
import { Redirect } from "react-router";


class CreatePOI extends Component {
  state = {
    spot: 1,
    title: "",
    image: "",
    description: "",
    listOfPoi: null,
    avatar: "",
    isUploading: false,
    progress: 0,
  }

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handlePoi = (e) => {
    e.preventDefault();
    const { pushPoi } = this.props
    const { title, image, description, listOfPoi } = this.state
    if (title && image && description && listOfPoi) {
      pushPoi({ pushPoi, title, image, description, listOfPoi })
      const spot = this.state.spot + 1;
      this.setState({
        spot,
        title: "",
        image: "",
        description: "",
        listOfPoi: null,
      })
    }
  }
  handleParentSubmit = (e) => {
    e.preventDefault();
    const { _id, name, city, image, description, location, duration, POI, handleFormSubmit } = this.props
    handleFormSubmit(_id, name, city, image, description, location, duration, POI)
  };

  handleBoth = (e) => {
    e.preventDefault()
    const { title, image, description, listOfPoi } = this.state
    console.log("mama te quiero",this.state)
    if (title && image && description && listOfPoi) {
      this.handlePoi(e)
      this.handleParentSubmit(e)
      this.setState({
        redirect: true
      })
    }
  }

  receiveCenter = (center) => {
    this.setState({
      listOfPoi: center,
    })
  }


  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      progress: 0
    });
  handleProgress = progress =>
    this.setState({
      progress
    });
  handleUploadError = error => {
    this.setState({
      isUploading: false
    });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({
      avatar: filename,
      progress: 100,
      isUploading: false
    });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url =>
        this.setState({
          image: url
        })
      );
  };



  render() {
    const { progress, isUploading, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <Navbar data='data' />
          <div className="create-box">
            <h1>Spot {this.state.spot}</h1>
            <form className="flex-column-create" onSubmit={this.handleFormSubmit}>
              <div className="flex-create">
                <label for="inp" className="inp" >
                  <input id="inp" type="text" name="title" placeholder="&nbsp;" value={this.state.title} onChange={this.handleChange} />
                  <span className="label">Title</span>
                  <span className="border"></span>
                </label>
              </div>
              <div className="flex-create">
                {/* <label for="inp" className="inp" >
              <input id="inp" type="text" name="image" placeholder="&nbsp;" value={this.state.image} onChange={this.handleChange}/>
              <span className="label">Image</span>
              <span className="border"></span>
            </label> */}
                <CustomUploadButton
                  className="uploadButton"
                  accept="image/*"
                  storageRef={firebase.storage().ref("images")}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                >
                  Select a photo from the gallery
            </CustomUploadButton>
                {isUploading && <p> Progress: {progress} </p>}
              </div>

              <div className="flex-create">
                <label for="inp" className="inp" >
                  <input id="inp" type="text" name="description" placeholder="&nbsp;" value={this.state.description} onChange={this.handleChange} />
                  <span className="label">Description</span>
                  <span className="border"></span>
                </label>
              </div>
              <div className="create-btn">
                <button onClick={this.handlePoi}>Next</button>
                <button onClick={this.handleBoth}>Save Tour</button>
              </div>
            </form>
            <Map sendCenter={this.receiveCenter} />

          </div>
          <BottomBar data='data' />
        </div>
      )
    }
  }
}

export default withAuth(CreatePOI);
