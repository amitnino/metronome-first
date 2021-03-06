// Imports
import { Timer } from './classes/accurateTimer.js';
// DOM Elements
import { addBeats, measureCount, startStopBtn, subtractBeats, tempoDisplay, tempoSlider, tempoText, } from './modules/htmlElements.js';
// Variables
const rootBeatAudio = new Audio('./sounds/click1.mp3');
const subBeatAudio = new Audio('./sounds/click2.mp3');
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
let currentBeat;
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
const setTimerInterval = () => {
    metronome.timeInterval = Math.floor(60000 / beatsPerMinute / beatsPerMeasure);
};
/**
 * A callback function that executes each time a time interval has ended.
 * (Executes every beat)
 * @type {function}
 */
const timerCallback = () => {
    console.log(`Current Beat: ${currentBeat}`);
    currentBeat !== 1 ? subBeatAudio.play() : rootBeatAudio.play();
    currentBeat = currentBeat === beatsPerMeasure ? 1 : currentBeat + 1;
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
        currentBeat = 1;
        metronome.start();
        rootBeatAudio.play();
        startStopBtn.innerHTML = 'STOP';
    }
    else {
        metronome.stop();
        startStopBtn.innerHTML = 'START';
    }
    ;
    metronomeIsRunning = !metronomeIsRunning;
};
/**
 * Increases the amount of Beats per Measure by one.
 * The value has to be between 3 to 9.
 * @type {function}
*/
const changeBeatsPerMeasureValue = (increase) => {
    if (increase) {
        if (beatsPerMeasure >= 9)
            return;
        beatsPerMeasure += 1;
    }
    else {
        if (beatsPerMeasure <= 3)
            return;
        beatsPerMeasure -= 1;
    }
    ;
    measureCount.innerHTML = `${beatsPerMeasure}`;
    setTimerInterval();
};
const changeTempoNameDisplay = () => {
    let text = '';
    if (beatsPerMinute <= 50)
        text = 'SLOW';
    if (beatsPerMinute >= 51 && beatsPerMinute <= 65)
        text = 'MODERATE';
    if (beatsPerMinute >= 66 && beatsPerMinute <= 80)
        text = 'FAST';
    if (beatsPerMinute >= 81)
        text = 'SONIC';
    tempoText.innerHTML = text;
};
// Eventlisteners
/**
 * Once DOM has loaded, a Timer class instance will be initiated.
 */
window.addEventListener('load', () => {
    const timerProps = {
        timeInterval,
        callback: timerCallback,
        errorCallback: timerErrorCallback
    };
    metronome = new Timer(timerProps);
});
/**
 * Once startStopBtn is clicked, the startMetronome or stopMetronome function will execute.
 * using the metronomeIsRunning boolean.
 * @type {EventListener}
 */
startStopBtn.addEventListener('click', () => toggleMetronome());
/**
 * Executes once slider is moved and changes the value of the range input.
 * @type {EventListener}
 */
tempoSlider.addEventListener('input', () => {
    toggleMetronome();
    beatsPerMinute = parseInt(tempoSlider.value);
    tempoDisplay.innerHTML = tempoSlider.value;
    changeTempoNameDisplay();
    setTimerInterval();
    toggleMetronome();
});
/**
 * Executes once subtract btn is clicked.
 * Decreases the amount of Beats per Measure by one
 * @type {EventListener}
 */
subtractBeats.addEventListener('click', () => changeBeatsPerMeasureValue(false));
/**
 * Executes once add btn is clicked.
 * Increases the amount of Beats per Measure by one
 * @type {EventListener}
 */
addBeats.addEventListener('click', () => changeBeatsPerMeasureValue(true));
