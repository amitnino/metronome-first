// Imports
import { Timer } from './classes/accurateTimer.js';
// DOM Elements
import { startStopBtn, } from './modules/htmlElements.js';
// Variables
/**
 * Number of beats per minute.
 *  @type {number}
 */
let beatsPerMinute = 60;
/**
 * Number of beats per measure.
 * @type {number}
*/
let beatsPerMeasure = 4;
/**
 * The amount of beats left until next measure.
 * @type {number}
*/
let currentBeat = 3;
/**
 * The amount of miliseconds in netween each beat.
 * @type {number}
 */
let timeInterval = 250;
/**
 * Boolean maintaining the current state of the metronome.
 * @type {boolean}
 */
let metronomeIsRunning = false;
/**
 * Instance of the Timer class
 * @type {Timer}
 */
let metronome;
// Functions
/**
 * returns the amount of miliseconds between each beat.
 * Calculated with the formula:
 * 60,000 / Beats per minute / Beats per measure = Milliseconds
 * @type {funcion}
 */
const calculateMilliseconds = () => {
    return Math.floor(60000 / beatsPerMinute / beatsPerMeasure);
};
/**
 * A callback function that executes each time a time interval has ended.
 * (Executes every beat)
 * @type {function}
 */
const timerCallback = () => {
    console.log(`Current Beat: ${beatsPerMeasure - currentBeat}`);
    currentBeat = currentBeat ? currentBeat - 1 : beatsPerMeasure - 1;
};
/**
 * A callback function that executes if an error accured.
 * @type {function}
 */
const timerErrorCallback = () => {
    console.log('Error has accurd, timer is paused');
};
/**
 * Toggles metronome state causing it to start or stop.
 * @type {function}
 */
const toggleMetronome = () => {
    if (!metronomeIsRunning) {
        metronome.start();
        startStopBtn.innerHTML = 'STOP';
    }
    else {
        metronome.stop();
        startStopBtn.innerHTML = 'START';
    }
    ;
    metronomeIsRunning = !metronomeIsRunning;
};
// On DOM Load
window.addEventListener('load', () => {
    const timerProps = {
        timeInterval,
        callback: timerCallback,
        errorCallback: timerErrorCallback
    };
    metronome = new Timer(timerProps);
});
// Eventlisteners
/**
 * Once startStopBtn is clicked, the startMetronome or stopMetronome function will execute.
 * using the metronomeIsRunning boolean.
 * @type {EventListener}
 */
startStopBtn.addEventListener('click', () => toggleMetronome());
