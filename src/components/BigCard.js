import React, { Component } from "react";
import "./BigCard.css";
import share from "./share.png";
import { BigLikeButton, BigShareButton } from "./Utils.js";
import styled from "styled-components";

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

  @media(min-width: 650px) {
    margin: -5px -20px 0 0;
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

  @media(min-width: 600px) {
    padding-left: 80px;
  }
`;

const CommentsBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  justify-content: flex-start;
  height: 60%;
`;

const CommentLine = styled.span`
  width: 90%;
  display: inline-block;
  text-overflow: ellipsis;
  box-shadow: 0 0 1px #7a8c8f;
  margin: 5px 0 5px 7.5%;
  border-radius: 5px;
  font-family: "Alegreya", serif;
`;

function CommentDiv (comment) {
  let commenter = Object.entries(comment)[0][0]
  let commentText = Object.entries(comment)[0][1];
  return(
    <CommentLine>{commenter} says "{commentText}"</CommentLine>
  );
};

class BigCard extends Component {
  constructor(props) {
    super(props);
    this.handleVisit = this.handleVisit.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.state = {
      commentsVisible: false
    };
    this.commentCount = Object.keys(this.props.comments).length;
  }

  handleShare(event) {
    alert("TODO: Add Share events");
    event.stopPropagation();
  }

  handleLike(event) {
    alert("TODO: Add Like events");
    event.stopPropagation();
  }

  handleVisit(event) {
    event.stopPropagation();
    window.open(this.props.imgUrl, "_blank");
  }

  handleCommentClick(event) {
    event.stopPropagation();
    this.setState(this.toggleCommentVisibility);
  }

  toggleCommentVisibility(state) {
    return {
      commentsVisible: !state.commentsVisible
    };
  }

  render() {
    return (
      <div
        className="bigCard"
        style={{ height: this.state.commentsVisible ? "950px" : null }}
      >
        <span>
          <BigShareButton onClick={this.handleShare}>
            <img src={share} height="100%" alt="Share!" />
          </BigShareButton>
          <BigLikeButton onClick={this.handleLike}>Like!</BigLikeButton>
        </span>
        <div
          className="bigPic"
          style={{ backgroundImage: `url(${this.props.imgUrl})` }}
        />
        <VisitButton onClick={this.handleVisit}>Visit</VisitButton>
        <CommentsBar
          style={{ height: this.state.commentsVisible ? "300px" : null }}
        >
          <CommentsSpan>
            {this.commentCount} Comments
            <ViewMore onClick={this.handleCommentClick}>...</ViewMore>
          </CommentsSpan>
          {this.state.commentsVisible ? <CommentsBox> {this.props.comments.map((comment, i) => <CommentDiv key={i} {...comment}/>)}</CommentsBox> : null}
        </CommentsBar>
        <PostedSpan>Posted By {this.props.postedBy} on {this.props.postedOn}</PostedSpan>
      </div>
    );
  }
}

export default BigCard;
