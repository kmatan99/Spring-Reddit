import React from 'react';
import axios from 'axios';

import {withRouter} from 'react-router-dom';

import '../css/ThreadCreate.css';

class ThreadCreate extends React.Component {
    state = {
        content: "",
        title: "",
        imageUrl: ""
    }
    
    render() {
        return(
            <div className="main">
                <input type="text" placeholder="Enter title" className="title" onChange={this.getTitle}></input>
                <textarea placeholder="Write about something.." className="content" onChange={this.getContent}></textarea>
                <input type="text" placeholder="Image URL" className="imageUrl" onChange={this.getImageUrl}></input>
                <button className="create" onClick={this.createThread}>Create thread</button>
            </div>
        )
    }

    getTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    getContent = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    getImageUrl = (e) => {
        this.setState({
            imageUrl: e.target.value
        })
    }

    createThread = () => {
        const threadData = {
            title: this.state.title,
            content: this.state.content,
            imageUrl: this.state.imageUrl
        }

        const jwtToken = localStorage.getItem('jwtToken');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwtToken;

        axios.post("http://localhost:9090/createthread", threadData)
        .then(() => {
            console.log("Created thread!");
            this.props.getThreads();
        })

        this.props.history.push("/");
        window.location.reload(false);
    }
}

export default withRouter(ThreadCreate);