import React, { Component } from "react";
import "../style/BigCard.css";
import "../style/Utils.css";
import share from "../images/share.png";
import { BigLikeButton, BigShareButton } from "./Utils.js";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPinDataAction } from "../store/actionTypes";

const VisitButton = styled.button`
  position: relative;
  margin: 20px 0 0 7.5%;
  font-family: "Alegreya", serif;
  font-weight: bold;
  font-size: 1.2em;
  padding: 5px 10px 5px 10px;
  text-decoration: none;
  border-radius: 15%;
  box-shadow: 0 0 10px #7a8c8f;
  background: #d4e6e8;
  border: 1px hidden;
  color: #1e2627;
  transition: all 0.2s;

  &:hover {
    background: #c3d8db;
  }

  &:active,
  &:focus {
    outline: none;
  }
`;

const CommentsBar = styled.div`
  margin: 20px 7.5% 0 7.5%;
  width: 85%;
  height: 10%;
  background: #d4e6e8;
  border-radius: 5px;
  box-shadow: 0 0 4px #7a8c8f;
`;

const CommentsSpan = styled.span`
  position: relative;
  display: inline-block;
  height: 56px;
  width: 80%;
  margin-top: 20px;
  font-size: 1.4em;
  font-family: "Alegreya", serif;
  padding-left: 60px;
`;

const ViewMore = styled.button`
  display: inline-block;
  float: right;
  margin: -5px 20px 0 0;
  border-radius: 50%;
  background: rgba(122, 140, 143, 0.6);
  color: #1e2627;
  height: 40px;
  width: 40px;
  border: 1px hidden;
  font-weight: bold;
  font-size: 1.1em;
  padding-bottom: 20px;
  transition: all 0.2s;

  @media (min-width: 650px) {
    margin: -5px -20px 0 0;
  }

  &:hover {
    background: #b3cbce;
  }

  &:active,
  &:focus {
    outline: none;
  }
`;

const AddCommentButton = styled.button`
  float: right;
  margin: 15px 15px 0 0;
  font-family: "Alegreya", serif;
  font-weight: bold;
  font-size: 1.2em;
  padding: 5px 10px 5px 10px;
  text-decoration: none;
  border-radius: 15%;
  box-shadow: 0 0 10px rgba(122, 140, 143, 0.9);
  background: rgba(122, 140, 143, 0.3);
  border: 1px hidden;
  color: #1e2627;
  transition: all 0.2s;

  &:hover {
    background: #c3d8db;
  }

  &:active,
  &:focus {
    outline: none;
  }
`;

const PostedSpan = styled.span`
  position: relative;
  display: inline-block;
  height: 80%;
  width: 80%;
  margin-top: 50px;
  font-size: 1.2em;
  font-family: "Alegreya", serif;
  padding-left: 7.5%;
  transition: all 0.3s;

  @media (min-width: 600px) {
    padding-left: 80px;
  }
`; //I didn't realize adding transitions makes resizing the screen more fun

const CommentsBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  justify-content: flex-start;
  height: 60%;
`;

const CommentLine = styled.span`
  width: 80%;
  display: inline-block;
  text-overflow: ellipsis;
  box-shadow: 0 0 1px #7a8c8f;
  margin: 5px 0 5px 10px;
  padding: 5px 35px 5px 10px;
  border-radius: 5px;
  font-family: "Alegreya", serif;
  background: #e5fafd;
  transition: all 0.3s;

  @media (min-width: 630px) {
    margin-left: 5%;
    padding-right: 45px;
  }
`;

function CommentDiv(comment, i) {
  const { user, commentText, postedOn } = comment;
  return (
    <CommentLine key={i}>
      {user} "{commentText}" <br /> on {postedOn.toDateString().substring(4)}
    </CommentLine>
  );
}

class BigCard extends Component {
  constructor(props) {
    super(props);
    this.handleVisit = this.handleVisit.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleViewMoreComments = this.handleViewMoreComments.bind(this);
    this.getPinData = this.getPinData.bind(this);
    this.handleReturnToSplash = this.handleReturnToSplash.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.handleExpandPicture = this.handleExpandPicture.bind(this);
    this.state = {
      commentsVisible: false,
      lightboxOpen: false,
      imgUrl: "",
      id: window.location.pathname.substring(5)
    };
  }

  componentWillMount() {
    this.getPinData();
  }

  handleShare(event) {
    alert("TODO: Add Share events");
    event.stopPropagation();
  }

  handleLike(event) {
    if (this.props.isAuthenticated) {
      alert("TODO: Add Like events");
    } else {
      alert("You must be logged in to like this Pin!");
    }
    event.stopPropagation();
  }

  handleVisit() {
    window.open(this.state.imgUrl, "_blank");
  }

  handleViewMoreComments(event) {
    event.stopPropagation();
    this.setState(this.toggleCommentVisibility);
  }

  toggleCommentVisibility(state) {
    return {
      commentsVisible: !state.commentsVisible
    };
  }

  handleReturnToSplash(e) {
    e.stopPropagation();
    if (e.target.className === "outerTint") {
      return this.props.history.push("/");
    }
  }

  handleAddComment() {
    if (this.props.isAuthenticated) {
    } else {
      alert("You must be logged in to post a comment!");
    }
  }

  handleExpandPicture() {
    this.setState({ lightboxOpen: true });
  }

  getPinData() {
    this.props.getPinDataAction(this.state.id);
    //Only one more prop to go!
    this.setState({
      postedBy: "John Smith",
    });
  }

  render() {
    const tempImg =
      this.props.pinData.imageURL === undefined
        ? this.props.location.state.imgUrl
        : this.props.pinData.imageURL;

    console.log(this.props.pinData);
    let commentCount = 0;
    if (this.props.pinData.comments !== undefined) {
      commentCount = this.props.pinData.comments.length;
    }
    return (
      <div
        className="outerTint"
        onClick={this.handleReturnToSplash}
        style={{ height: this.state.commentsVisible ? "1050px" : null }}
      >
        <div
          className="bigCard"
          style={{
            transition: "height 0.4s",
            height: this.state.commentsVisible ? "950px" : null
          }}
        >
          <span>
            <BigShareButton onClick={this.handleShare}>
              <img
                style={{ transition: "all 0.4s" }}
                src={`${share}`}
                height="100%"
                alt="Share!"
              />
            </BigShareButton>
            <h2 className="title">{this.props.pinData.title}</h2>
            <BigLikeButton onClick={this.handleLike}>Like!</BigLikeButton>
          </span>
          <div
            className="bigPic"
            style={{ backgroundImage: `url(${tempImg})` }}
            onClick={this.handleExpandPicture}
          />
          <VisitButton onClick={this.handleVisit}>Visit</VisitButton>
          <CommentsBar
            style={{
              transition: "all 0.4s",
              height: this.state.commentsVisible ? "320px" : null,
              paddingBottom: this.state.commentsVisible ? "20px" : "0px"
            }}
          >
            <CommentsSpan id="CommentsSpan">
              {commentCount} Comments
              <ViewMore onClick={this.handleViewMoreComments}>...</ViewMore>
            </CommentsSpan>
            {this.state.commentsVisible ? (
              <span>
                <CommentsBox>
                  {this.props.pinData.comments.map((comment, i) => CommentDiv(comment, i))}
                </CommentsBox>
                <AddCommentButton onClick={this.handleAddComment}>
                  Comment
                </AddCommentButton>
              </span>
            ) : null}
          </CommentsBar>
          <PostedSpan>
            Posted By {this.state.postedBy} on {this.props.pinData.postedOn}
          </PostedSpan>
        </div>
        {this.state.lightboxOpen ? (
          <Lightbox
            mainSrc={this.state.imgUrl}
            onCloseRequest={() => {
              this.setState({ lightboxOpen: false });
            }}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    pinData: state.pinData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ getPinDataAction }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(BigCard)
);
