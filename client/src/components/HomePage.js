import React from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';


import ThreadPage from './ThreadPage';
import UserProfile from './UserProfile';
import NewThreadButton from './NewThreadButton';
import ThreadCreate from './ThreadCreate';
import UserPosts from './UserPosts';
import '../css/HomePage.css';

class HomePage extends React.Component {
    state = {
        allThreads: [],
    }

    render() {
        return(
            <Router>
                <Switch>
                    <Route path="/createThread">
                        <ThreadCreate 
                            getThreads={this.getThreads}
                        />
                    </Route>

                    <Route path="/userPosts">
                        <UserPosts />
                    </Route>

                    <Route path="/">
                        <div className="homepage">
                            <UserProfile />
                            <ThreadPage 
                                allThreads={this.state.allThreads}
                                getThreads={this.getThreads}
                            />
                            <NewThreadButton />
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
}

export default HomePage;