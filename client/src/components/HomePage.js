import React from 'react';
import axios from 'axios';

import ThreadPage from './ThreadPage';
import '../css/HomePage.css';

class HomePage extends React.Component {
    state = {
        allThreads: []
    }

    render() {
        return(
            <ThreadPage 
                allThreads={this.state.allThreads}
            />
        )
    }

    componentDidMount = () => {
        this.getThreads();
    }

    getThreads = () => {
        axios.get("http://localhost:9090/getthreads")
        .then((response) => {
            this.setState({
                allThreads: response.data.threadList
            })
        })
    }
}

export default HomePage;