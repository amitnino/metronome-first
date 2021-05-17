// Imports

import { Timer, TimerInterface } from './classes/accurateTimer.js';

// DOM Elements

import { 
    startStopBtn,
    

} from './htmlElements.js';

// Variables

/**
 * Number of beats per minute.
 *  @type {number}
 */
let beatsPerMinute: number;

/** 
 * Number of beats per measure.
 * @type {number}
*/
let beatsPerMeasure: number;

/**
 * The amount of beats left until next measure.
 * @type {number}
*/
let currentBeat: number;

/**
 * The amount of miliseconds in netween each beat.
 * @type {number}
 */
let timeInterval: number;

let metronomeIsRunning: boolean = false;

let metronome: Timer;

// Global Functions

interface timeIntervalInterface{
    
    beatsPerMinute: number;
    beatsPerMeasure: number;
    
};

/**
 * returns the amount of miliseconds between each beat.
 * Calculated with the formula: 
 * 60,000 / Beats per minute / Beats per measure = Milliseconds
 * @type {funcion}
 */
const calculateMilliseconds = (): number => {

    return Math.floor(60000 / beatsPerMinute / beatsPerMeasure);

}


// Start / Stop Metronome Functions
/**
 * Creates a New Timer instance and starts the metronome.
 * @type {function}
 */
const startMetronome: () => void = (): void => {
    
    /**
     * A callback function that executes each time a time interval has ended.
     * (Executes every beat)
     * @type {function}
     */
    const beatCounter: () => void = () : void => {
        
        
        console.log(`Current Beat: ${ beatsPerMeasure - currentBeat}`);
        
        currentBeat = currentBeat ? currentBeat - 1 : beatsPerMeasure - 1;

    };
    
    /**
     * A callback function that executes if an error accured.
     * @type {function}
     */
    const errorCallback: () => void = () : void => {
        
        console.log('Error has accurd, timer is paused');
        
    };

    timeInterval = calculateMilliseconds();
    
    const timerProps: TimerInterface = {
        timeInterval,
        callback: beatCounter,
        errorCallback: errorCallback
    };
    
    metronome = new Timer(timerProps);

    metronome.start();

    metronomeIsRunning = true;

    startStopBtn.innerHTML = 'STOP';
    
};

const stopMetronome: ()=> void = (): void => {
    
    metronome.stop();

    metronomeIsRunning = false;

    startStopBtn.innerHTML = 'START';

}

/**
 * Once startStopBtn is clicked, the startMetronome or stopMetronome function will execute.
 * using the metronomeIsRunning boolean.
 * @type {EventListener}
 */
startStopBtn.addEventListener('click', ()=>{

    metronomeIsRunning ? stopMetronome() : startMetronome();

});