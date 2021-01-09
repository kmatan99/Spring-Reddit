import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import '../css/Register.css';

class Register extends React.Component {

    state = {
        username: "",
        password: "",
        email: ""
    }

    render(){
        return(
            <div className="mainR">
                <img className="headerR" src="https://sp-images.summitpost.org/963237.jpg?auto=format&fit=max&h=1000&ixlib=php-2.1.1&q=35&s=bf5d49d02fd4f55f33c34f8c5f24dd66"
                    alt="404"></img>
                <p className="descR">Spring Reddit is officially here, sign up and enjoy!</p>
                <input className="usernameR" type="text" placeholder="Username" onChange={this.handleUsernameInput}></input>
                <input className="passwordR" type="password" placeholder="Password" onChange={this.handlePasswordInput}></input>
                <input className="emailR" type="text" placeholder="Email" onChange={this.handleEmailInput}></input>
                <button className="registerR" onClick={this.toLogin}>Register</button>
            </div>
        )
    }

    handleUsernameInput = (e) => {
        this.setState({
            username: e.target.value
        }, () => console.log(this.state.username))
    }

    
    handlePasswordInput = (e) => {
        this.setState({
            password: e.target.value
        }, () => console.log(this.state.password))
    }

    
    handleEmailInput = (e) => {
        this.setState({
            email: e.target.value
        }, () => console.log(this.state.email))
    }

    toLogin = () => {
        const data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }

        axios.post("http://localhost:9090/createuser", data)
        .then(() => {
            console.log("You have registered sucesfully!");
        })
        this.props.history.push("/login");
    }
}

export default withRouter(Register);