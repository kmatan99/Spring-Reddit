import React from 'react';
import {withRouter} from 'react-router-dom';

import '../css/UserProfile.css';

class UserProfile extends React.Component {
    
    render() {
        return(
            <div className="userOptions">
                {
                    this.props.isLoggedIn ? (
                        <div className="registeredUser">
                            <div className="username" onClick={this.toUserPosts}>username</div>
                            <div className="editUser">Edit profile</div>
                            <button className="logOut" onClick={this.logOut}>Log out</button>
                        </div>
                    ) 
                    : ( 
                        <div className="guestUser">
                            <button className="login" onClick={this.toLogin}>Log In</button>
                            <button className="register" onClick={this.toRegister}>Sign Up!</button>
                            <p className="generalDescription">
                                Welcome to Spring Reddit: The front page of the internet!                      
                            </p>
                            <p className="guestDescription">As a guest user, you can view, upvote and downvote posts, 
                                but you cannot comment or create new ones until you've created an account
                            </p>
                        </div> 
                    )
                }
            </div>
        )
    }

    toUserPosts = () => {
        this.props.history.push("/userPosts");
    }

    toLogin = () => {
        this.props.history.push("/login");
    }

    toRegister = () => {
        this.props.history.push("/register");
    }

    logOut = () => {
        localStorage.removeItem("jwtToken");
        window.location.reload(false);
    }
}


export default withRouter(UserProfile);