import React, { Component } from "react";
import twitterLogo from "../images/TwitterLogo.png";

const Logout = props => (
  <div className="header-login">
    <button
      className="header-button twitter-button"
      onClick={props.toggleAuthentication}
    >
      Login with Twitter
      <img className="logo twitter-img" src={twitterLogo} />
    </button>
  </div>
);

export default Logout;
