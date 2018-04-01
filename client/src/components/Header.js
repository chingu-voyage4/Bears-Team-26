import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import logo from "../images/logo.png";
import twitterLogo from "../images/TwitterLogo.png";
import Navbar from "../style/Navbar.css";
import Login from "./Login";
import Logout from "./Logout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { attemptLoginAction, logoutAction } from "../store/actionTypes";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <div className="header-container">
          <div className="header-title">
            <NavLink to="/">
              Pinterest
              <img className="logo" src={logo} />
            </NavLink>
          </div>
          <div className="header-selection">
            {this.props.isAuthenticated ? (
              <Login toggleAuthentication={this.props.logoutAction} />
            ) : (
              <Logout toggleAuthentication={this.props.attemptLoginAction} />
            )}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    isAuthenticated: reduxState.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ attemptLoginAction, logoutAction }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
