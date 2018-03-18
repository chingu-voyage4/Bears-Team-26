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
  const { user, commentText, postedOn } = comment;
  return (
    <CommentLine>
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
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.getPinData = this.getPinData.bind(this);
    this.state = {
      commentsVisible: false
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
    alert("TODO: Add Like events");
    event.stopPropagation();
  }

  handleVisit() {
    window.open(this.state.imgUrl, "_blank");
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

  getPinData() {
    //Will eventually be used to get the pin's info from the back-end
    this.setState({
      comments: commentsArr,
      postedBy: "John Smith",
      postedOn: sampleDate,
      commentCount: Object.keys(commentsArr).length,
      imgUrl:
        "https://static.boredpanda.com/blog/wp-content/uploads/2016/09/mother-bear-cubs-animal-parenting-21-57e3a2161d7f7__880.jpg"
    });
  }

  render() {
    return (
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
              src={`/${share}`}
              height="100%"
              alt="Share!"
            />
          </BigShareButton>
          <BigLikeButton onClick={this.handleLike}>Like!</BigLikeButton>
        </span>
        <div
          className="bigPic"
          style={{ backgroundImage: `url(${this.state.imgUrl})` }}
        />
        <VisitButton onClick={this.handleVisit}>Visit</VisitButton>
        <CommentsBar
          style={{
            transition: "height 0.4s",
            height: this.state.commentsVisible ? "300px" : null
          }}
        >
          <CommentsSpan>
            {this.state.commentCount} Comments
            <ViewMore onClick={this.handleCommentClick}>...</ViewMore>
          </CommentsSpan>
          {this.state.commentsVisible ? (
            <CommentsBox>
              {this.state.comments.map(comment => (
                <CommentDiv key={comment.id} {...comment} />
              ))}
            </CommentsBox>
          ) : null}
        </CommentsBar>
        <PostedSpan>
          Posted By {this.state.postedBy} on {this.state.postedOn}
        </PostedSpan>
      </div>
    );
  }
}

export default BigCard;
