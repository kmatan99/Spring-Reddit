import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import '../css/FullThread.css';
import Comment from './Comment';

class FullThread extends React.Component {
    state = {
        thread: {},
        comments: [],
        clickedLike: false,
        clickedDislike: false,
        commentContent: ""
    }

    render() {
        return(
            <div className="mainF">
                <div className="fullthread">
                    <div className="buttonsF">
                        <button className="upvoteF" onClick={this.likeThread}>⇧</button>
                        <button className="downvoteF" onClick={this.dislikeThread}>⇩</button>
                        <p className="likecountF">{this.state.thread.likecount}</p>
                    </div>
                    <div className="textcontainerF">
                        <div className="fullThreadTitle">{this.state.thread.title}</div>
                        <hr></hr>
                        <div className="fullThreadContent">{this.state.thread.content}</div>
                        <div className="commentsData">Comments ({this.state.comments.length})</div>
                        {this.props.isLoggedIn ? (
                            <div className="commentareaF">
                                <textarea className="addcommentF" placeholder="Write something" onChange={this.getComment}></textarea>
                                <button className="postcommentF" onClick={this.addComment}>Comment</button>
                            </div>
                        ) : (
                            <p className="userNotLogged">Only registered users can post comments. Please log in to contribute to this thread.</p>
                        )
                        }
                        <div className="comments">{this.renderComments()}</div>
                    </div>
                    <div className="imageF">
                        {this.state.thread.imageUrl ? (
                                <img src={this.state.thread.imageUrl} 
                                    alt="" className="imageLinkF">
                                </img>
                            ) :     
                            (
                                <img src="https://www.ecpgr.cgiar.org/fileadmin/templates/ecpgr.org/Assets/images/No_Image_Available.jpg" 
                                    alt="" className="imageLinkF">
                                </img>
                            )
                        }
                    </div>
                </div>
                <button className="tohomeF" onClick={this.toFrontPage}>Go to front page!</button>
            </div>
        )
    }

    componentDidMount = () => {
        this.getSingleThread();
        this.getThreadComments();
    }

    getSingleThread = () => {
        axios.get("http://localhost:9090/getthread/" + this.props.threadId)
        .then(response => {
            this.setState({
                thread: response.data
            }, () => console.log(response.data))
        })
    }

    getThreadComments = () => {
        axios.get("http://localhost:9090/threadcomments/" + this.props.threadId)
        .then(response => {
            this.setState({
                comments: response.data
            })
        })
    }

    renderComments = () => {
        if(this.state.comments === null) {
            return null
        }

        return(
            this.state.comments.map((comment, index) => {
                return(
                    <Comment 
                        key={index}
                        comment={comment}
                        getThreadComments={this.getThreadComments}
                    />
                )
            })
        )
    }

    likeThread = () => {
        if(!this.state.clickedLike) {
            axios.get("http://localhost:9090/likethread/" + this.props.threadId)
            .then(() => {
                this.getSingleThread();
            })
        }

        if(this.state.clickedDislike) {
            this.setState({
                clickedDislike: false
            })
        }
        else {
            this.setState({
                clickedLike: true,
                clickedDislike: false
            })
        }
    }

    dislikeThread = () => {
        if(!this.state.clickedDislike) {
            axios.get("http://localhost:9090/dislikethread/" + this.props.threadId)
            .then(() => {
                this.getSingleThread();
            })
        }

        if(this.state.clickedLike) {
            this.setState({
                clickedLike: false
            })
        }
        else {
            this.setState({
                clickedLike: false,
                clickedDislike: true
            })
        }
    }

    toFrontPage = () => {
        this.props.history.push("/")
    }

    getComment = (e) => {
        this.setState({
            commentContent: e.target.value
        })
    }

    addComment = () => {
        const data = {
            content: this.state.commentContent
        }

        if(this.state.commentContent === "") {
            return null
        }

        const jwtToken = localStorage.getItem("jwtToken");
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwtToken;

        axios.post("http://localhost:9090/comment/" + this.props.threadId, data)
        .then(() => {
            this.getThreadComments();
        })
    }
}

export default withRouter(FullThread);