import React, { Component } from "react";
import tourService from "../lib/tour-service";
import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import firebase from "firebase";

export default class CreateTour extends Component {
  state = {
    name: "",
    image: "",
    city: "",
    description: "",
    location: "",
    duration: "",
    errorName: "",
    POI: [],
    avatar: "",
    isUploading: false,
    progress: 0
  };

  validate = () => {
    let errorName = "";

    if (
      !this.state.name ||
      !this.state.image ||
      !this.state.city ||
      !this.state.description
    ) {
      errorName = "There are some missing fields";
    }
    if (errorName) {
      const { name, image, city, description } = this.state;
      this.setState({
        errorName: "There are some missing fields"
      });
      return false;
    }
    return true;
  };

  handleFormSubmit = event => {
    event.preventDefault();
    tourService
      .create(this.state)
      .then(data => {
        return data;
      })
      .catch(error => console.log(error.response));
  };

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleStage = e => {
    e.preventDefault();
    const { changeStage } = this.props;
    const { name, image, city, description } = this.state;
    const newStage = 1;
    const isValid = this.validate();
    if (isValid) {
      changeStage({ newStage, name, image, city, description });
    }
  };

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
    const { progress, isUploading } = this.state;
    return (
      <div>
        <Navbar data="data" />
        <div className="create-box">
          <h1>New tour</h1>
          <form className="flex-column-create" onSubmit={this.handleFormSubmit}>
            <div className="flex-create">
              <label for="inp" className="inp">
                <input
                  id="inp"
                  type="text"
                  name="name"
                  placeholder="&nbsp;"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <span className="label">Name</span>
                <span className="border" />
              </label>
            </div>
            <div className="flex-create">
              <label for="inp" className="inp">
                <input
                  id="inp"
                  type="text"
                  name="city"
                  placeholder="&nbsp;"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
                <span className="label">City</span>
                <span className="border" />
              </label>
            </div>
            <div className="flex-create">
              <label for="inp" className="inp">
                <input
                  id="inp"
                  type="text"
                  name="description"
                  placeholder="&nbsp;"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <span className="label">Description</span>
                <span className="border" />
              </label>
            </div>
            
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
            <div style={{ color: "red" }}>{this.state.errorName}</div>
            <button className="create-btn" onClick={this.handleStage}>
              Next
            </button>
          </form>
        </div>
        <BottomBar data="data" />
      </div>
    );
  }
}
