import React from 'react';
import {NavLink,Redirect} from 'react-router-dom';
import logo from '../images/logo.png';
import twitterLogo from '../images/twitterLogo.png';
import Navbar from '../style/Navbar.css';
import Login from './Login';
import Logout from './Logout';

export default class Header extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isAuthenticated:false
        }
    }
    toggleAuthentication(){
        this.setState({
            isAuthenticated: !this.state.isAuthenticated
        });
        console.log("Logout Successful");
    }
  render(){
    return (
        <header>
              <div className="header-container">
                <div className="header-title">
                      <NavLink to="/">Pinterest
                        <img className="logo" src={logo}/>
                      </NavLink>
                  </div>   
                  <div className="header-selection"> 
                  {
                      !this.state.isAuthenticated?
                      <Login toggleAuthentication={()=>this.toggleAuthentication()}/>
                      :<Logout toggleAuthentication={()=>this.toggleAuthentication()}/>
                  }
                </div>
            </div> 
          </header>
    )
  }
};