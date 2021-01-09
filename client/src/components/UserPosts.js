import React from 'react';
import axios from 'axios';

import { withRouter } from 'react-router-dom';

import ThreadPreview from './ThreadPreview';
import UserComments from './UserComments';
import '../css/UserPosts.css';

class UserPosts extends React.Component {
    state = {
        threads: [],
        comments: []
    }

    render() {
        return(
            <div className="maincontainerU">
                <div className="maincontainerU2">
                    <p className="postsU">Your posts:</p>
                    <p className="commentsU">Your comments:</p>
                </div>
                <div className="maincontainerU3">
                    <div className="threads">{this.renderPosts()}</div>
                    <button className="homeButton" onClick={this.toHome}>Home</button>
                    <div className="commentsU2">{this.renderComments()}</div>
                </div>
            </div>
        )
    }

    componentDidMount = () => {
        this.getPosts();
        this.getComments();
    }

    getPosts = () => {
        const jwtToken = localStorage.getItem('jwtToken')
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwtToken;

        axios.get("http://localhost:9090/userthreads")
        .then(response => {
            this.setState({
                threads: response.data.threadList
            })
        })
    }

    getComments = () => {
        const jwtToken = localStorage.getItem('jwtToken')
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwtToken;

        axios.get("http://localhost:9090/usercomments")
        .then(response => {
            this.setState({
                comments: response.data
            })
        })
    }

    renderPosts = () => {
        if(this.state.threads.length === 0) {
            return null;
        }

        return (
            this.state.threads.map((thread, index) => {
                return (
                    <ThreadPreview 
                        key={index}
                        thread={thread}
                        threadContainer="userThreads"
                        editButton="editButton"
                        deleteButton="deleteButton"
                        getPosts={this.getPosts}
                        getThreadId={this.props.getThreadId}
                    />
                )
            })
        )
    }

    renderComments = () => {
        if(this.state.comments.length === 0) {
            return null
        }

        return(
            this.state.comments.map((comment, index) => {
                return(
                    <UserComments 
                        key={index}
                        comment={comment}
                        getThreadId={this.props.getThreadId}
                        getComments={this.getComments}
                    />
                )
            })
        )
    }

    toHome = () => {
        this.props.getThreads();
        this.props.history.push("/");
    }
}

export default withRouter(UserPosts)