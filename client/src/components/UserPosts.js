import React from 'react';
import axios from 'axios';

import { withRouter } from 'react-router-dom';

import Thread from './Thread';
import '../css/UserPosts.css';

class UserPosts extends React.Component {
    state = {
        threads: []
    }

    render() {
        return(
            <div className="mainContainer">
                <div className="threads">{this.renderPosts()}</div>
                <button className="homeButton" onClick={this.toHome}>Home</button>
            </div>
        )
    }

    componentDidMount = () => {
        this.getPosts()
    }

    getPosts = () => {
        axios.get("http://localhost:9090/userthreads/3")
        .then(response => {
            this.setState({
                threads: response.data.threadList
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
                    <Thread 
                        key={index}
                        thread={thread}
                        threadContainer="userThreads"
                        editButton="editButton"
                        deleteButton="deleteButton"
                        getPosts={this.getPosts}
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