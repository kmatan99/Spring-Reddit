import React from 'react';
import axios from 'axios';

import {withRouter} from 'react-router-dom';

import '../css/Thread.css';

class Thread extends React.Component {

    state = {
        clickedLike: false,
        clickedDislike: false,
        user: ""
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
                    <p className="createdBy">Created by: {this.state.user}</p>
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

export default withRouter(Thread);