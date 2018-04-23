import React, { Component } from "react";
import "../style/Card.css";
import share from "../images/share.png";
import { LikeButton, ShareButton } from "./Utils.js";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import {
  loginAction,
  logoutAction,
  getBoardDataAction
} from "../store/actionTypes";
import { bindActionCreators } from "redux";
import BoardButton from "./BoardButton";

const ReportButton = styled.button`
  position: absolute;
  top: 97.5%;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: rgb(200, 0, 40);
  color: white;
  left: 90%;
  border: 1px hidden;
  z-index: 10;
  font-size: 1.1em;
  padding-right: 7px;

  @media (min-width: 480px) {
    left: 87%;
    top: 97.5%;
    padding-right: 6px;
  }
`;

const TextLink = styled.button`
  position: absolute;
  top: 97.5%;
  left: 2%;
  border: 1px hidden;
  background: transparent;
  color: white;
  z-index: 10;
  font-family: "Alegreya", serif;

  &:active,
  &:focus {
    outline: none;
  }
`;

const getBoardTitle = async id => {
  const res = await fetch(`/boards/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const json = await res.json();
  if (json.err) {
    return alert(err);
  } else {
    return json.result.title;
  }
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.stopHoverPropagation = this.stopHoverPropagation.bind(this);
    this.handleMouseExit = this.handleMouseExit.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleVisit = this.handleVisit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openBoardPopUp = this.openBoardPopUp.bind(this);
    this.createNewBoard = this.createNewBoard.bind(this);
    this.getBoardData = this.getBoardData.bind(this);
    this.state = {
      isHovering: false,
      likeBoxOpen: false,
      loadingBoards: false,
      boardBoxOpen: false,
      boards: []
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  handleMouseExit() {
    this.setState({ isHovering: false });
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

  handleClick(e) {
    if (e.target.className.indexOf("tinted") > -1) {
      return this.props.history.push({
        pathname: `/pin/${this.props.id}`,
        state: { imgUrl: this.props.imgUrl }
      });
    }
  }

  handleShare(event) {
    alert("TODO: Add Share events");
    event.stopPropagation();
  }

  handleLike(event) {
    event.stopPropagation();
    if (this.props.isAuthenticated) {
      this.setState({ likeBoxOpen: true });
      this.getBoardData();
    } else {
      alert("You must be logged in to like this Pin!");
    }
  }

  closeModal() {
    this.setState({ likeBoxOpen: false, boardBoxOpen: false });
  }

  handleReport(e) {
    e.stopPropagation();
    alert("TODO: Add Report events");
  }

  stopHoverPropagation(e) {
    e.stopPropagation();
  }

  handleVisit(e) {
    e.stopPropagation();
    window.open(this.props.imgUrl, "_blank");
  }

  openBoardPopUp() {
    this.setState({ likeBoxOpen: false, boardBoxOpen: true });
    this.createNewBoard();
  }

  async createNewBoard() {
    console.log("Testing");
    const response = await fetch("/boards/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: "Example",
        description: "Some random text!",
        image: "ThisShouldBeAURL",
        name: "?",
        privacy: true,
        userID: this.props.user._id
      })
    });
    const json = await response.json();
    const board = json.result;
    this.props.getBoardDataAction();
    this.getBoardData();
  }

  //TODO Hoist Board Data to Flexbox rather than loading it for every card.

  getBoardData() {
    this.setState({ loadingBoards: true });
    Promise.all(
      this.props.user.boards.map(id => {
        return Promise.resolve(getBoardTitle(id));
      })
    ).then(data => {
      this.setState({
        boards: data.map((title, i) => {
          return (
            <BoardButton
              title={title}
              id={this.props.user.boards[i]}
              pin={this.props.id}
              resetfn={this.props.resetfn}
            />
          );
        }),
        loadingBoards: false
      });
    });
  }

  render() {
    let urlLength =
      window.innerWidth >= 480 ? 25 : window.innerWidth >= 450 ? 45 : 34;

    const cardClasses = this.props.options.concat("card");
    return (
      <div
        className={
          this.state.isHovering
            ? cardClasses.concat("tinted").join(" ")
            : cardClasses.join(" ")
        }
        onMouseOver={this.handleMouseHover}
        onMouseLeave={this.handleMouseExit}
        onClick={this.handleClick}
        style={{ backgroundImage: `url(${this.props.imgUrl})` }}
      >
        {this.state.isHovering ? (
          <span>
            <ShareButton
              onClick={this.handleShare}
              onMouseOver={this.stopHoverPropagation}
              onMouseLeave={this.handleMouseHover}
            >
              <img src={share} height="100%" alt="Share!" />
            </ShareButton>
            <LikeButton
              onMouseOver={this.stopHoverPropagation}
              onClick={this.handleLike}
              onMouseLeave={this.handleMouseHover}
            >
              Like!
            </LikeButton>
            <TextLink
              onClick={this.handleVisit}
              onMouseOver={this.stopHoverPropagation}
              onMouseLeave={this.handleMouseHover}
            >
              {this.props.imgUrl.substring(0, urlLength)}
            </TextLink>
            <ReportButton
              onClick={this.handleReport}
              onMouseOver={this.stopHoverPropagation}
              onMouseLeave={this.handleMouseHover}
            >
              !
            </ReportButton>
          </span>
        ) : null}
        <Popup
          open={this.state.likeBoxOpen}
          onClose={this.closeModal}
          closeOnDocumentClick
        >
          <div>
            Select a board:
            <br />
            <div className="boardSelectorDiv">
              {this.state.loadingBoards ? (
                <div className="spinner">
                  <div className="double-bounce1" />
                  <div className="double-bounce2" />
                </div>
              ) : null}
              {this.state.boards ? this.state.boards : null}
            </div>
            <br />
            Or Create a new Board :
            <br />
            <button onClick={this.openBoardPopUp}>Click Me</button>
          </div>
        </Popup>
        <Popup
          open={this.state.boardBoxOpen}
          onClose={this.closeModal}
          closeOnDocumentClick
        >
          <div>
            <div className="boardSelectorDiv" >
            <label>Title</label>
            <input type="text"/>
            </div>
            <label> Create Board! </label>
            <button onClick={this.createNewBoard} />
          </div>
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      { loginAction, logoutAction, getBoardDataAction },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Card));
