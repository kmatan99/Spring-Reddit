import React from 'react';
import axios from 'axios';

import { withRouter } from 'react-router-dom';

import '../css/Login.css';

class Login extends React.Component {
    
    state = {
        username: "",
        password: ""
    }

    render(){
        return(
            <div className="mainL">
                <img className="headerL" src="https://sp-images.summitpost.org/963237.jpg?auto=format&fit=max&h=1000&ixlib=php-2.1.1&q=35&s=bf5d49d02fd4f55f33c34f8c5f24dd66"
                    alt="404"></img>
                <input className="usernameL" type="text" placeholder="Username" onChange={this.handleUsernameInput}></input>
                <input className="passwordL" type="password" placeholder="Password" onChange={this.handlePasswordInput}></input>
                <button className="loginL" onClick={this.handleLogin}>Login</button>
                <p className="noaccL" onClick={this.toRegister}>Don't have an account? Sign up here!</p>
            </div>        
        )
    }

    handleUsernameInput = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordInput = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = () => {
        const userData = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('http://localhost:9090/authenticate', userData)
        .then((response) => {
            localStorage.setItem("jwtToken", response.data.jwtToken);
            this.props.history.push("/");
            window.location.reload(false);
        })
        .catch(err => console.log(err));
    }

    toRegister = () => {
        this.props.history.push("/register");
    }
}

export default withRouter(Login);