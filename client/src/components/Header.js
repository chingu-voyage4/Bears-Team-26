import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import logo from "../images/logo.png";
import twitterLogo from "../images/TwitterLogo.png";
import Navbar from "../style/Navbar.css";
import Login from "./Login";
import Logout from "./Logout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction, logoutAction } from "../store/actionTypes";

class Header extends React.Component {
  constructor(props) {
    super(props);
    //needs converted into redux.
    this.state = {
      authenticated: false
    };
  }
  componentDidMount() {
    fetch("/me/loginCheck", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cache: "no-cache"
      },
      credentials: "same-origin"
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        data != null
          ? this.setState({ authenticated: true })
          : this.setState({ authenticated: false });
      });
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
            {//this.props.isAuthenticated ? (
            this.state.authenticated ? (
              //Commented out components are those done with redux and will
              //be the ones used after redux is applied
              // <Login toggleAuthentication={this.props.logoutAction} />
              <Login />
            ) : (
              // <Logout toggleAuthentication={this.props.loginAction} />
              <Logout authenticated={this.state.authenticated} />
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
    ...bindActionCreators({ loginAction, logoutAction }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
