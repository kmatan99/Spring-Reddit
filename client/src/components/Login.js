import React from 'react';
import axios from 'axios';

import { withRouter } from 'react-router-dom';

import '../css/Login.css';

class Login extends React.Component {
    render(){
        return(
            <div className="mainL">
                <img className="headerL" src="https://sp-images.summitpost.org/963237.jpg?auto=format&fit=max&h=1000&ixlib=php-2.1.1&q=35&s=bf5d49d02fd4f55f33c34f8c5f24dd66"></img>
                <input className="usernameL" type="text" placeholder="Username"></input>
                <input className="passwordL" type="password" placeholder="Password"></input>
                <button className="loginL" onClick={this.toHomePage}>Login</button>
                <p className="noaccL" onClick={this.toRegister}>Don't have an account? Sign up here!</p>
            </div>        
        )
    }

    toHomePage = () => {
        this.props.history.push("/");
    }

    toRegister = () => {
        this.props.history.push("/register");
    }
}

export default withRouter(Login);