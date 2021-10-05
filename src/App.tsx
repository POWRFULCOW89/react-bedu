import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const characters = ["Batman", "Robin", "Joker"];

interface CharProps {
  characters: string[];
}

// Destructurando
const Characters = ({characters}: CharProps) => <>{characters.map(char => <li>{char}</li>)}</>

// Interface inline
// const Characters = (props: {characters: string[]}) => <>{characters.map(char => <li>{char}</li>)}</>

// Interface de props
// const Characters = (props: CharProps) => <>{props.characters.map(char => <li>{char}</li>)}</>


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
          {<Characters characters={characters} />}
        </ul>
      </header>
    </div>
  );
}

export default App;
