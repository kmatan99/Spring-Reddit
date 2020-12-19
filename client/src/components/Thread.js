import React from 'react';

import '../css/Thread.css';

class Thread extends React.Component {
    render() {
        return(
            <div className="threadContainer">
                <div className="buttons">
                    <button className="upvote">⇧</button>
                    <button className="downvote">⇩</button>
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
}

export default Thread;