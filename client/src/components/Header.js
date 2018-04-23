import React from "react";
import { span, Redirect } from "react-router-dom";
import logo from "../images/logo.png";
import twitterLogo from "../images/TwitterLogo.png";
import Navbar from "../style/Navbar.css";
import Login from "./Login";
import Logout from "./Logout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction, logoutAction, retrieveNewPinsAction } from "../store/actionTypes";
import { withRouter } from "react-router-dom";

function updateUserStatus() {
  fetch("/me/loginCheck", {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cache: "no-cache"
    },
    credentials: "same-origin"
  })
    .then(response => response.json())
    .then(user => {
      user != null ? this.props.loginAction(user) : this.props.logoutAction();
    })
    .catch(err => {
      console.log(err);
    });
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.updateUserStatus = updateUserStatus.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    this.updateUserStatus();
  }

  goHome() {
    this.props.retrieveNewPinsAction();
    this.props.history.push("/");
  }

  render() {
    return (
      <header>
        <div className="header-container">
          <div className="header-title">
            <span onClick={this.goHome}>
              Pinterest
              <img className="logo" src={logo} />
            </span>
          </div>
          <div className="header-selection">
            {this.props.isAuthenticated ? <Login /> : <Logout />}
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
    ...bindActionCreators({ loginAction, logoutAction, retrieveNewPinsAction }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
