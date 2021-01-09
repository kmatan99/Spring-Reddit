import React from 'react';

import '../css/Header.css';

class Header extends React.Component {
    render() {
        return(
            <div className="navBar">
                <div className="logo">
                    <img src="https://spring.io/images/projects/spring-edf462fec682b9d48cf628eaf9e19521.svg" 
                        alt="" className="logo"></img>
                </div>
                <p className="appName">Spring Reddit</p>
            </div>
        )
    }
}

export default Header;