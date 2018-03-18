import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../images/logo.png';
import twitterLogo from '../images/twitterLogo.png';
import Navbar from '../style/Navbar.css';

export default class Header extends React.Component {
    constructor(props){
        super(props);
    }
  render(){
      const isLogin = this.props.isLogin
    return (
        <header>
              <div className="header-container">
                  <div className="header-title">
                      <NavLink to="/">Pinterest
                      <img className="logo" src={logo}/>
                      </NavLink>
                  </div>
                  <div className="navbar-links">
                  {!isLogin ?
                    <div className="header-login">
                        <NavLink to="/login">Login with twitter
                        <img className="logo" src={twitterLogo} />
                        </NavLink>
                      </div>
                    :<Link to="" onClick={this.props.onLogout}>Logout</Link>

                }
                      <NavLink to ="/search">Search</NavLink> 
                  </div>            
              </div>
          </header>
    )
  }
};