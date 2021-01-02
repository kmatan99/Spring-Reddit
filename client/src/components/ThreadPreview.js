import React from 'react';
import axios from 'axios';

import {withRouter} from 'react-router-dom';

import '../css/ThreadPreview.css';

class ThreadPreview extends React.Component {

    state = {
        clickedLike: false,
        clickedDislike: false,
        user: ""
    }

    render() {
        return(
            <div className={this.props.threadContainer}>
                <div className="buttons">
                    <button className="upvote" onClick={this.likeThread}>⇧</button>
                    <button className="downvote" onClick={this.dislikeThread}>⇩</button>
                    <p className="likecount">{this.props.thread.likecount}</p>
                </div>
                <div className="textContainer">
                    <p className="createdBy">Posted by: {this.state.user}</p>
                    <p className="threadTitle">{this.props.thread.title}</p>
                    <hr className="titleBorder"></hr>
                    <p className="threadContent">{this.props.thread.content}</p>
                </div>
                <div className="image">
                    {this.props.thread.imageUrl ? (
                            <img src={this.props.thread.imageUrl} 
                                alt="">
                            </img>
                        ) :     
                        (
                            <img src="https://www.ecpgr.cgiar.org/fileadmin/templates/ecpgr.org/Assets/images/No_Image_Available.jpg" 
                                alt="">
                            </img>
                        )
                    }

                    {this.props.editButton ? (
                        <div className="userButtons">
                            <button className={this.props.editButton}>✎</button>
                            <button className={this.props.deleteButton} onClick={this.deleteThread}>X</button>
                        </div>
                        ) : (
                            null
                        )
                    }       
                </div>
            </div>
        )
    }

    componentDidMount = () => {
        axios.get("http://localhost:9090/getuser/" + this.props.thread.userid)
        .then(response => {
            this.setState({
                user: response.data.username    
            })
        })
    }

    likeThread = () => {

        if(!this.state.clickedLike) {
            axios.get("http://localhost:9090/likethread/" + this.props.thread.id)
            .then(() => {
                this.props.getThreads();
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
            axios.get("http://localhost:9090/dislikethread/" + this.props.thread.id)
            .then(() => {
                this.props.getThreads();
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

    deleteThread = () => {
        axios.delete("http://localhost:9090/deletethread/" + this.props.thread.id)
        .then(() => {
            this.props.getPosts();
        })
    }
}

export default withRouter(ThreadPreview);