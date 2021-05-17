// Imports
import { Timer, TimerInterface } from './classes/accurateTimer.js';
// DOM Elements
import {
    addBeats,
    measureCount,
    startStopBtn, subtractBeats, tempoDisplay, tempoSlider, tempoText,
} from './modules/htmlElements.js';
// Variables
/**
 * Number of beats per minute.
 *  @type {number}
 */
let beatsPerMinute: number = 60;
/** 
 * Number of beats per measure.
 * @type {number}
*/
let beatsPerMeasure: number = 4;
/**
 * The amount of beats left until next measure.
 * @type {number}
*/
let currentBeat: number;
/**
 * The amount of miliseconds in netween each beat.
 * @type {number}
 */
let timeInterval: number = 250;
/**
 * Boolean maintaining the current state of the metronome.
 * @type {boolean}
 */
let metronomeIsRunning: boolean = false;
/**
 * Instance of the Timer class
 * @type {Timer}
 */
let metronome: Timer;
// Functions
/**
 * returns the amount of miliseconds between each beat.
 * Calculated with the formula: 
 * 60,000 / Beats per minute / Beats per measure = Milliseconds
 * @type {funcion}
 */
const setTimerInterval = (): void => {
    metronome.timeInterval = Math.floor(60000 / beatsPerMinute / beatsPerMeasure);
};
/**
 * A callback function that executes each time a time interval has ended.
 * (Executes every beat)
 * @type {function}
 */
const timerCallback = (): void => {
    console.log(`Current Beat: ${beatsPerMeasure - currentBeat}`);
    currentBeat = currentBeat ? currentBeat - 1 : beatsPerMeasure - 1;
};
/**
 * A callback function that executes if an error accured.
 * @type {function}
 */
const timerErrorCallback = (): void => {
    console.log('Error has accurd, timer is paused');
};
/**
 * Toggles metronome state causing it to start or stop.
 * @type {function}
 */
const toggleMetronome = (): void => {
    if (!metronomeIsRunning){
        currentBeat = beatsPerMeasure - 1;
        metronome.start();
        startStopBtn.innerHTML = 'STOP';    
    }else{
        metronome.stop();
        startStopBtn.innerHTML = 'START';
    };
    metronomeIsRunning = !metronomeIsRunning;
};
/**
 * Increases the amount of Beats per Measure by one.
 * The value has to be between 3 to 9.
 * @type {function}
*/
const changeBeatsPerMeasureValue = (increase: boolean): void => {
    if (increase){
        if (beatsPerMeasure >= 9) return;
        beatsPerMeasure += 1;
    }else{
        if (beatsPerMeasure <= 3) return;
        beatsPerMeasure -= 1;
    };
    measureCount.innerHTML = `${beatsPerMeasure}`;
    setTimerInterval();
};

const changeTempoNameDisplay = (): void => {
    let text: string = '';
    if (beatsPerMinute <= 50) text = 'SLOW';
    if (beatsPerMinute >= 51 && beatsPerMinute <= 65) text = 'MODERATE';
    if (beatsPerMinute >= 66 && beatsPerMinute <= 80) text = 'FAST';
    if (beatsPerMinute >= 81) text = 'SONIC';
    tempoText.innerHTML = text;
};
// Eventlisteners
/**
 * Once DOM has loaded, a Timer class instance will be initiated.
 */
window.addEventListener('load',()=>{    
    const timerProps: TimerInterface = {
        timeInterval,
        callback: timerCallback,
        errorCallback: timerErrorCallback
    };
    metronome = new Timer(timerProps);
})
/**
 * Once startStopBtn is clicked, the startMetronome or stopMetronome function will execute.
 * using the metronomeIsRunning boolean.
 * @type {EventListener}
 */
startStopBtn.addEventListener('click', ()=>toggleMetronome());
/**
 * Executes once slider is moved and changes the value of the range input.
 * @type {EventListener}
 */
tempoSlider.addEventListener('input', () => {
    beatsPerMinute = parseInt(tempoSlider.value);
    tempoDisplay.innerHTML = tempoSlider.value;
    changeTempoNameDisplay();
    setTimerInterval();
});
/**
 * Executes once subtract btn is clicked.
 * Decreases the amount of Beats per Measure by one
 * @type {EventListener}
 */
subtractBeats.addEventListener('click', ()=>changeBeatsPerMeasureValue(false))
/**
 * Executes once add btn is clicked.
 * Increases the amount of Beats per Measure by one
 * @type {EventListener}
 */
addBeats.addEventListener('click', ()=>changeBeatsPerMeasureValue(true))