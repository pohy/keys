import React, {Component} from 'react';

import './Key.css';

import notes from './notes.json';
import midi from './midi';

class Key extends Component {
    static propTypes = {
        note: React.PropTypes.oneOf(notes).isRequired,
        onPress: React.PropTypes.func,
        onRelease: React.PropTypes.func,
        octave: React.PropTypes.number
    };

    static defaultProps = {
        onPress: () => {},
        onRelease: () => {}
    };

    state = {
        pressed: false
    };

    constructor(props) {
        super(props);

        this.NOTE_ON = 144;
        this.NOTE_OFF = 128;
        midi.registerOnMessage(this.onMidiMessage);
    }

    onMidiMessage = (event) => {
        const {note, octave} = this.props;
        if (event.note === note && event.octave === octave) {
            if (event.type === this.NOTE_ON) {
                this.keyPressed();
            } else if (event.type === this.NOTE_OFF) {
                this.keyReleased();
            }
        }
    };

    keyPressedByMouse = (event) => {
        if (event.buttons) {
            this.keyPressed();
        }
    };

    keyPressed = () => {
        this.setState({pressed: true});
        this.props.onPress();
    };

    keyReleased = () => {
        this.setState({pressed: false});
        this.props.onRelease();
    };

    cssClasses = () => {
        const {note} = this.props;

        const sharpClass = note.includes('#') ? 'sharp' : '';
        const pressedClass = this.state.pressed ? 'pressed' : '';

        return `key ${sharpClass} ${pressedClass}`;
    };

    render() {
        return (
            <div
                className={this.cssClasses()}
                onMouseDown={this.keyPressedByMouse}
                onMouseEnter={this.keyPressedByMouse}
                onMouseUp={this.keyReleased}
                onMouseLeave={this.keyReleased}
            ></div>
        );
    }
}

export default Key;
