import React from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import '../css/HomePage.css';

import ThreadPage from './ThreadPage';
import UserProfile from './UserProfile';
import NewThreadButton from './NewThreadButton';
import ThreadCreate from './ThreadCreate';
import UserPosts from './UserPosts';
import FullThread from './FullThread';
import Register from './Register';
import Login from './Login';

class HomePage extends React.Component {
    state = {
        allThreads: [],
        threadId: null,
        isLoggedin: true
    }

    render() {
        return(
            <Router>
                <Switch>
                    <Route path="/register">
                        <Register />
                    </Route>

                    <Route path="/login">
                        <Login />
                    </Route>

                    <Route path="/createThread">
                        <ThreadCreate 
                            getThreads={this.getThreads}
                        />
                    </Route>

                    <Route path="/userPosts">
                        <UserPosts 
                            getThreads={this.getThreads}
                            getThreadId={this.getThreadId}
                        />
                    </Route>

                    <Route path="/thread">
                        <FullThread 
                            threadId={this.state.threadId}
                        />
                    </Route>

                    <Route path="/">
                        <div className="homepage">
                            <UserProfile />
                            <ThreadPage 
                                allThreads={this.state.allThreads}
                                getThreads={this.getThreads}
                                getThreadId={this.getThreadId}
                            />
                            {this.state.isLoggedin ? (<NewThreadButton />) : (null)}
                        </div> 
                    </Route>
                </Switch>
            </Router> 
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

    getThreadId = (id) => {
        this.setState({
            threadId: id
        })
    }
}

export default HomePage;