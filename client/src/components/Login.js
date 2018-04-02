import React from "react";
import notification from "../images/notification.png";
import add from "../images/add.png";
import { BigLikeButton, BigShareButton } from "./Utils.js";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleGoToNewPin = this.handleGoToNewPin.bind(this);
  }

  handleGoToNewPin() {
    return this.props.history.push("/newPin");
  }

  render() {
    return (
      <div className="header-login">
        <BigShareButton>
          <img
            height="100%"
            style={{ transition: "all 0.4s" }}
            src={add}
            onClick={this.handleGoToNewPin}
          />
        </BigShareButton>
        <BigShareButton>
          >
          <img className="nav-img" src={notification} />
        </BigShareButton>
    
        <form className="inline" method = "GET" action = "/auth/logout">
          <button className="logout" type="submit">
            Logout
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);

//        //<button className="header-button logout" onClick={props.toggleAuthentication}>
