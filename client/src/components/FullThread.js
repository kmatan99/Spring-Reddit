import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import '../css/FullThread.css';

class FullThread extends React.Component {
    state = {
        thread: {}
    }

    render() {
        return(
            <div className="fullthread">
                <div className="fullThreadTitle">{this.state.thread.title}</div>
                <div className="fullThreadContent">{this.state.thread.content}</div>
            </div>
        )
    }

    componentDidMount = () => {
        this.getSingleThread();
    }

    getSingleThread = () => {
        axios.get("http://localhost:9090/getthread/" + this.props.threadId)
        .then(response => {
            this.setState({
                thread: response.data
            }, () => console.log(response.data))
        })
    }
}

export default withRouter(FullThread);