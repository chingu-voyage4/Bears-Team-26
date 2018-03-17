import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../images/logo.png';
import Navbar from '../style/Navbar.css';

const Header=()=> {
  return (
      <header>
            <div className="header-container">
                <div className="header-title">
                    <NavLink to="/">Pinterest
                    <img className="logo" src={logo}/>
                    </NavLink>
                </div>
                <div className="navbar-links">
                    <div className="header-login">
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">Signup</NavLink>
                    </div>
                    <NavLink to ="/search">Search</NavLink> 
                </div>            
            </div>
        </header>
  )};

   export default Header; 
