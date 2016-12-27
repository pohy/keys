import React, {Component} from 'react';

import './App.css';

import Key from './Key.js';

class App extends Component {
    keys() {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        return notes.map((note) =>
            <Key sharp={note.includes('#')} key={note}/>
        );
    }

    render() {
        const keys = this.keys();

        return (
            <div className="app">
                <div className="fill"></div>
                <div className="keys">
                    {keys}
                    {keys}
                    {keys}
                    {keys}
                </div>
            </div>
        );
    }
}

export default App;
