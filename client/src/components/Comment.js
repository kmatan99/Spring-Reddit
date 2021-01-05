import React from 'react';
import axios from 'axios';

import '../css/Comment.css';

class Comment extends React.Component {
    state = {
        clickedLike: false,
        clickedDislike: false
    }

    render() {
        return(
            <div className="commentContainer">
                <div className="buttonsC">
                    <button className="upvoteC" onClick={this.likeComment}>⇧</button>
                    <button className="downvoteC" onClick={this.dislikeComment}>⇩</button>
                    <p className="likecountC">{this.props.comment.likecount}</p>
                </div>
                <div className="comment">{this.props.comment.content}</div>
            </div>
        )
    }

    likeComment = () => {

        if(!this.state.clickedLike) {
            axios.get("http://localhost:9090/likecomment/" + this.props.comment.id)
            .then(() => {
                this.props.getThreadComments();
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

    dislikeComment = () => {

        if(!this.state.clickedDislike) {
            axios.get("http://localhost:9090/dislikecomment/" + this.props.comment.id)
            .then(() => {
                this.props.getThreadComments();
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
}

export default Comment;