import React from 'react';

import Thread from './Thread';
import '../css/ThreadPage.css';

class ThreadPage extends React.Component {
    render() {
        return(
            <div className="threads">
                {this.renderThreads()}
            </div>
        )
    }

    renderThreads = () => {
        if(this.props.allThreads.length === 0) {
            return null;
        }

        return(
            this.props.allThreads.map((thread, index) => {
                return(
                    <Thread 
                        key={index}
                        thread={thread}
                        getThreads={this.props.getThreads}
                    />
                )
            })
        )
    }
}

export default ThreadPage;