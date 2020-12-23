import React from 'react';

import '../css/UserProfile.css';

class UserProfile extends React.Component {

    state = {
        isLoggedIn: false
    }
    
    render() {
        return(
            <div className="userOptions">
                {
                    this.state.isLoggedIn ? (
                        <div>Username</div>
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
}


export default UserProfile;