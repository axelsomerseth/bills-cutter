import React from 'react';
// import logo from './logo.svg';
import './App.css';
import FeedForm from './feed/Feed.js';

const feedFormProps = {
  action: 'http://localhost:8080/',
  method: 'POST',
  mode: 'no-cors'
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <FeedForm name="feedForm" action={feedFormProps.action} method={feedFormProps.method} mode={feedFormProps.mode} />
      </header>
    </div>
  );
}

export default App;