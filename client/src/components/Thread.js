import React from 'react';
import axios from 'axios';

import '../css/Thread.css';

class Thread extends React.Component {

    state = {
        clickedLike: false,
        clickedDislike: false
    }

    render() {
        return(
            <div className="threadContainer">
                <div className="buttons">
                    <button className="upvote" onClick={this.likeThread}>⇧</button>
                    <button className="downvote" onClick={this.dislikeThread}>⇩</button>
                    <p className="likecount">{this.props.thread.likecount}</p>
                </div>
                <div className="textContainer">
                    <p className="title">{this.props.thread.title}</p>
                    <hr className="titleBorder"></hr>
                    <p className="content">{this.props.thread.content}</p>
                </div>
                <div className="image">
                    <img src=
                        "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188327.jpg" alt="">
                    </img>
                </div>
            </div>
        )
    }

    likeThread = () => {

        if(!this.state.clickedLike) {
            axios.get("http://localhost:9090/likethread/" + this.props.thread.id)
            .then(() => {
                this.props.getThreads();
            })
        }

        else {
            console.log("already liked")
        }

        this.setState({
            clickedLike: true,
            clickedDislike: false
        })
    }

    dislikeThread = () => {

        if(!this.state.clickedDislike) {
            axios.get("http://localhost:9090/dislikethread/" + this.props.thread.id)
            .then(() => {
                this.props.getThreads();
            })
        }
        else {
            console.log("already disliked");
        }

        this.setState({
            clickedLike: false,
            clickedDislike: true
        })
    }
}

export default Thread;