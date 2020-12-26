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
import '../css/HomePage.css';

class HomePage extends React.Component {
    state = {
        allThreads: []
    }

    render() {
        return(
            <Router>
                <Switch>
                    <Route path="/createThread">
                        <div>on create thread route</div>
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