import React from 'react';
import {withRouter} from 'react-router-dom';

import ThreadPreview from './ThreadPreview';
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
                    <ThreadPreview 
                        key={index}
                        thread={thread}
                        getThreads={this.props.getThreads}
                        getThreadId={this.props.getThreadId}
                        threadContainer="threadContainer"
                    />
                )
            })
        )
    }
}

export default withRouter(ThreadPage);