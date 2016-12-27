import React, {Component} from 'react';

import './Key.css';

import notes from './notes.json';

class Key extends Component {
    static propTypes = {
        note: React.PropTypes.oneOf(notes).isRequired,
        onPress: React.PropTypes.func,
        onRelease: React.PropTypes.func
    };

    static defaultProps = {
        onPress: () => {},
        onRelease: () => {}
    };

    state = {
        pressed: false
    };

    keyPressed = (event) => {
        this.setState({pressed: !!event.buttons});
        this.props.onPress();
    };

    keyReleased = () => {
        this.setState({pressed: false});
        this.props.onRelease();
    };

    cssClasses = () => {
        const {note, keyLeft, keyRight} = this.props;

        const sharpClass = note.includes('#') ? 'sharp' : '';
        const keyLeftClass = keyLeft ? 'key-left' : '';
        const keyRightClass = keyRight ? 'key-right' : '';
        const pressedClass = this.state.pressed ? 'pressed' : '';

        return `key ${sharpClass} ${keyLeftClass} ${keyRightClass} ${pressedClass}`;
    };

    render() {
        return (
            <div
                className={this.cssClasses()}
                onMouseDown={this.keyPressed}
                onMouseEnter={this.keyPressed}
                onMouseUp={this.keyReleased}
                onMouseLeave={this.keyReleased}
            ></div>
        );
    }
}

export default Key;
