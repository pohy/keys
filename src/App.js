import React, {Component} from 'react';

import './App.css';

import Key from './Key.js';
import notes from './notes';

class App extends Component {
    keys() {
        return notes.map((note) =>
            <Key note={note} key={note}/>
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
