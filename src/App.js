import React from 'react';
import {Router, Redirect} from '@reach/router';
import './App.css';
import DisplayBracket from './components/displayBracket';
import SingleElimDisplayBracket from './components/singleElimBracket';
import DisplayRegForm from './views/displayRegForm';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>PlaceHolder for Navbar Component</h2>
      </header>
        <Router>
          <DisplayRegForm path = '/registration'/>
          <DisplayBracket path = "/double"/>
          <SingleElimDisplayBracket path = '/single' default/>
        </Router>
    </div>
  );
}

export default App;
