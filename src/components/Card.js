import React, { Component } from "react";
import styled from "styled-components";
import "./Card.css";
import share from "./share.png";

const LikeButton = styled.button`
  border: 1px hidden;
  border-radius: 25%;
  float: right;
  margin: 5px 5px 0 0;
  background: red;
  color: white;
  font-family: "Alegreya", serif;
  font-weight: bold;
  width: 40px;
  height: 21px;
`;

const ShareButton = styled.button`
  border: 1px hidden;
  border-radius: 25%;
  float: left;
  margin: 5px 0 0 5px;
  color: white;
  background: white;
  width: 40px;
  height: 21px;
`;

class Card extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.state = {
      isHovering: false
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

  handleClick() {
    alert("TODO: Add links");
  }

  handleShare(event) {
    alert("TODO: Add Share events");
    event.stopPropagation();
  }

  handleLike(event) {
    alert("TODO: Add Like events");
    event.stopPropagation();
  }

  render() {
    return (
      <div
        className="card"
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
        onClick={this.handleClick}
        style={{ backgroundImage: `url(${this.props.imgUrl})` }}
      >
        {this.state.isHovering ? (
          <span>
            <ShareButton onClick={this.handleShare}>
              <img src={share} height="100%" alt="Share!" />
            </ShareButton>
            <LikeButton onClick={this.handleLike}>Like!</LikeButton>
          </span>
        ) : null}
      </div>
    );
  }
}

export default Card;
