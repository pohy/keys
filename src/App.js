import React, {Component} from 'react';

import './App.css';

import Key from './Key.js';
import notes from './notes';

class App extends Component {
    constructor(props) {
        super(props);

        this.OCTAVES = [3, 4, 5, 6, 7];
    }

    keys() {
        return this.OCTAVES.map((octave) =>
            notes.map((note) =>
                <Key note={note} octave={octave} key={note}/>
            )
        );
    }

    render() {
        const keys = this.keys();

        return (
            <div className="app">
                <div className="fill"></div>
                <div className="keys">
                    {keys}
                </div>
            </div>
        );
    }
}

export default App;
