import React from 'react';
import axios from 'axios';

import ThreadPage from './ThreadPage';
import UserProfile from './UserProfile';
import '../css/HomePage.css';

class HomePage extends React.Component {
    state = {
        allThreads: []
    }

    render() {
        return(
            <div className="homepage">
                <UserProfile />
                <ThreadPage 
                allThreads={this.state.allThreads}
                getThreads={this.getThreads}
            />
            </div>   
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