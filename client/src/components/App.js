import React from 'react'

import HomePage from './HomePage';
import Header from './Header';
import '../css/App.css';

class App extends React.Component {
  render() {
    return(
      <div className="appContainer">
        <Header />
        <HomePage />
      </div>
    )
  }
}

export default App;
