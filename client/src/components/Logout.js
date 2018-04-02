import React, { Component } from "react";
import twitterLogo from "../images/TwitterLogo.png";

const Logout = props => (
  <div className="header-login">
  <form method="GET" action="/auth/twitter">
    <button
      type="submit"
      className="header-button twitter-button"
    >
      Login with Twitter
      <img className="logo twitter-img" src={twitterLogo} />
    </button>
    </form>
  </div>
);

export default Logout;
