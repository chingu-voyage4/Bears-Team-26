import React from 'react';
import notification from '../images/notification.png';
import add from '../images/add.png'
import { BigLikeButton, BigShareButton } from "./Utils.js";
import styled from "styled-components";

const Login = (props)=>(
    <div className="header-login">
        <BigShareButton>
            <img height="100%" style={{ transition: "all 0.4s" }} src= {add} />
        </BigShareButton>
        <BigShareButton>>
            <img className="nav-img" src= {notification} />
        </BigShareButton>
        <button
        onClick={props.toggleAuthentication}
         className="logout">
        Logout
        </button>
    </div>    
);

export default Login;

//        //<button className="header-button logout" onClick={props.toggleAuthentication}>
