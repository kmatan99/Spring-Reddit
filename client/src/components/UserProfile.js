import React from 'react';
import {withRouter} from 'react-router-dom';

import '../css/UserProfile.css';

class UserProfile extends React.Component {

    state = {
        isLoggedIn: true
    }
    
    render() {
        return(
            <div className="userOptions">
                {
                    this.state.isLoggedIn ? (
                        <div className="registeredUser">
                            <div className="username" onClick={this.toUserPosts}>username</div>
                            <div className="editUser">Edit profile</div>
                            <button className="logOut">Log out</button>
                        </div>
                    ) 
                    : ( 
                        <div className="guestUser">
                            <button className="login">Log In</button>
                            <button className="register">Sign Up!</button>
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
}


export default withRouter(UserProfile);