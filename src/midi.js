// @flow

import notes from './notes';

class MIDI {
    constructor() {
        this.callbacks = [];
        this._init();
    }

    async _init() {
        this.MIDIAccess = await navigator.requestMIDIAccess();
        this.MIDIInput = this.inputs()[0];
    }

    inputs(): Array<MIDIInput> {
        let inputs = [];
        this.MIDIAccess.inputs.forEach((input) => inputs.push(input));
        if (!inputs.length) {
            throw new Error('No inputs available');
        }
        return inputs;
    }

    _onMIDIMessage = (event: MIDIMessageEvent): Object => {
        const MIDIEvent = {
            type: event.data[0] & 0xf0,
            channel: event.data[0] & 0xf,
            note: this._getNote(event.data[1]),
            octave: Math.floor(event.data[1] / notes.length),
            velocity: event.data[2],
            sourceEvent: event
        };
        this.callbacks.forEach((callback) => callback(MIDIEvent));
    };

    _getNote(pitch) {
        return notes[pitch % notes.length];
    }

    registerOnMessage(onKey: Function): MIDI {
        this.callbacks = this.callbacks.concat(onKey);
        return this;
    }

    set MIDIInput(input: MIDIInput) {
        this._MIDIInput = input;
        this.MIDIInput.onmidimessage = this._onMIDIMessage;
        return this;
    }

    get MIDIInput(): MIDIInput {
        if (!this._MIDIInput) {
            throw new Error('No MIDI Input selected');
        }
        return this._MIDIInput;
    }

    get MIDIAccess() {
        if (!this._MIDIAccess) {
            throw new Error('MIDI Access not granted or supported');
        }
        return this._MIDIAccess;
    }

    set MIDIAccess(MIDIAccess) {
        this._MIDIAccess = MIDIAccess;
        return this;
    }
}

export default new MIDI();