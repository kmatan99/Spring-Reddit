import React from 'react';
import axios from 'axios';

import { withRouter } from 'react-router-dom';

import Thread from './Thread';

class UserPosts extends React.Component {
    state = {
        threads: []
    }

    render() {
        return(
            <div>{this.renderPosts()}</div>
        )
    }

    componentDidMount = () => {
        this.getPosts()
    }

    getPosts = () => {
        axios.get("http://localhost:9090/userthreads/4")
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
                    />
                )
            })
        )
    }
}

export default withRouter(UserPosts)