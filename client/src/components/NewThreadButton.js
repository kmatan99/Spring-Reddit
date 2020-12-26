import React from 'react';
import {withRouter} from 'react-router-dom';

import '../css/NewThreadButton.css';

class NewThreadButton extends React.Component {
    render() {
        return(
            <div className="buttonDiv">
                <button className="createThread" onClick={this.toThreadCreate}>New Thread +</button>
            </div>
        )
    }

    toThreadCreate = () => {
        this.props.history.push("/createThread")
    }
}

export default withRouter(NewThreadButton)