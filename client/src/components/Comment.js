import React from 'react';

import '../css/Comment.css';

class Comment extends React.Component {
    render() {
        return(
            <div className="commentContainer">
                <div className="buttonsC">
                    <button className="upvoteC">⇧</button>
                    <button className="downvoteC">⇩</button>
                    <p className="likecountC">{this.props.comment.likecount}</p>
                </div>
                <div className="comment">{this.props.comment.content}</div>
            </div>
        )
    }
}

export default Comment;