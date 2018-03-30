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

const sampleDate = new Date().toDateString();

const commentsArr = [
  {
    id: 1,
    user: "John Smith",
    commentText: "Wow what a Cool Bear!",
    postedOn: sampleDate
  },
  {
    id: 2,
    user: "Steve Johnson",
    commentText: "Such an inspirational photo!",
    postedOn: sampleDate
  },
  {
    id: 3,
    user: "Smarty Pants",
    postedOn: sampleDate,
    commentText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.

Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.

Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper.

Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. `
  }
];

function CommentDiv(comment) {
  const { user, commentText, postedOn, id } = comment;
  return (
    <CommentLine key={id}>
      {user} "{commentText}" <br /> on {postedOn.substring(4)}
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
      return this.props.history.goBack(); //Now that's a handy function haha
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
    const tempImg =
      this.props.location.state !== undefined
        ? this.props.location.state.imgUrl
        : "";
    //Will eventually be used to get the pin's info from the back-end
    this.setState({
      comments: commentsArr,
      postedBy: "John Smith",
      postedOn: sampleDate,
      commentCount: Object.keys(commentsArr).length,
      imgUrl: tempImg
    });
  }

  render() {
    console.log(this.props.pinData);
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
            <BigLikeButton onClick={this.handleLike}>Like!</BigLikeButton>
          </span>
          <div
            className="bigPic"
            style={{ backgroundImage: `url(${this.state.imgUrl})` }}
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
              {this.state.commentCount} Comments
              <ViewMore onClick={this.handleViewMoreComments}>...</ViewMore>
            </CommentsSpan>
            {this.state.commentsVisible ? (
              <span>
                <CommentsBox>
                  {this.state.comments.map(comment => CommentDiv(comment))}
                </CommentsBox>
                <AddCommentButton onClick={this.handleAddComment}>
                  Comment
                </AddCommentButton>
              </span>
            ) : null}
          </CommentsBar>
          <PostedSpan>
            Posted By {this.state.postedBy} on {this.state.postedOn}
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
