import React, { Component } from "react";
import tourService from "../lib/tour-service";
import { Link } from 'react-router-dom';
import { Redirect } from "react-router";
import { withAuth } from "../components/AuthProvider";
import TourMarkers from "../components/TourMarkers";
import BottomBar from "../components/BottomBar";
class TourDetail extends Component {
  state = {
    id: this.props.match.params.id,
    tour: {},
    redirect: false,
    comments: [],
    comment: ""
  };
  componentDidMount() {
    this.showTour();
  }
  showTour = () => {
    tourService.showTour(this.state.id).then(tour => {
      let comments = [];
      if (tour.comments ) comments = tour.comments
      this.setState({
        tour: tour,
        comments: comments
      });
    });
  };
  handleDelete = e => {
    e.preventDefault();
    tourService.delete(this.state.id)
      .then(data => {
        this.setState({ redirect: true });
        return data;
      })
      .catch(error => console.log(error.response));
  };
  handleChange = event => {
    let { value } = event.target;
    this.setState({
      comment: value
    });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    const newComment = {
      comment: this.state.comment,
      owner: this.props.user.username
    };

    const newCommentsList = [newComment, ...this.state.comments]
    this.setState({
      comments: newCommentsList,
      comment: ""
    });
    tourService
      .comment(this.state.id, newCommentsList)
      .catch(error => console.log(newCommentsList,"errorsito", error.response));
  };
  isOwner = () => {
    const { tour } = this.state;
    if (tour.creator === this.props.user._id) {
      return (
        <div className={"delate-tour"}>
          <form onSubmit={this.handleDelete}>
            <button type="submit">Delete Tour</button>
          </form>
        </div>
      );
    }
  };
  render() {
    const { redirect } = this.state;
    const { tour, id } = this.state;
    const { comments } = this.state;
    const { username } = this.props.user;
    let test = new Date();

    if (redirect) {
      return <Redirect to="/user/profile" />;
    } else {
      return (
        <div>
          <div className="tourDetailCard">
            <h1 className="detailTourTitle">{tour.name}</h1>
            <div className="detailCardImg">
              <img src={tour.image} alt="tourimg" />
            </div>
            <div className="detailDescription">
              <p>{tour.description}</p>
            </div>
            <div className="startBtnContainer">
              <Link className="startTourBtn" to={`/tour/${id}/navigator`}>Start</Link>
            </div>
            <div>
              <TourMarkers id={this.state.id} />
            </div>
          </div>
          {this.isOwner()}
          <div className="commentSection">
            <h1 className="commentTitle">Comments</h1>
                <div className="comments">
                  <form onSubmit={this.handleFormSubmit}>
                    <input
                      type="text"
                      name="comments"
                      onChange={this.handleChange}
                      value={this.state.comment}
                      placeholder="Write a comment here..."
                    />
                    <button className="comments-btn" type="submit">Comment</button>
                  </form>
                </div>
              {comments ? comments.map((comment, id) => {
                return (
                  <div className="commentBox" key={id} username={username}>
                    <h2> {comment.owner}  on {test.toLocaleDateString()}</h2>
                    <p>{comment.comment}</p>
                  </div>
                );
              }): null}
          </div>
          <BottomBar data="data" />
        </div>
      );
    }
  }
}
export default withAuth(TourDetail);