import React from 'react';
import './App.css';
import FeedForm from './feed/Feed.js';
import Navigation from './navigation/Navigation.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const feedFormProps = {
  action: 'http://localhost:8080/',
  method: 'POST',
  mode: 'no-cors'
}

function App() {
  return (
    <div className="App">
      <Navigation username={'Axelito'} />
      <header className="App-content">
        <FeedForm name="feedForm" action={feedFormProps.action} method={feedFormProps.method} mode={feedFormProps.mode} />
      </header>
    </div>
  );
}

export default App;