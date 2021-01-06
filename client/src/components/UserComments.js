import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import '../css/UserComments.css';

class UserComments extends React.Component {

    state = {
        thread: {}
    }

    render() {
        return(
            <div className="mainUC">
                <p className="contentUC">{this.props.comment.content}</p>
                <div className="auxUC">
                    <p className="commentedinUC" onClick={this.toThread}>Comment in thread: {this.state.thread.id}</p>
                    <button className="deleteUC" onClick={this.deleteComment}>x</button>
                </div>
            </div>
        )
    }

    componentDidMount = () => {
        this.getThread();
    }

    getThread = () => {
        axios.get("http://localhost:9090/getthread/" + this.props.comment.threadid)
        .then(response => {
            this.setState({
                thread: response.data
            })
        })
    }

    toThread = () => {
        this.props.getThreadId(this.props.comment.threadid);
        this.props.history.push("/thread");
    }

    deleteComment = () => {
        axios.delete("http://localhost:9090/deletecomment/" + this.props.comment.id)
        .then(() => {
            this.props.getComments();
        })
    }
}

export default withRouter(UserComments);