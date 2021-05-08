// DOM Elements

/** @type {HTMLElement} */
const tempoDisplay = document.querySelector('.tempo');

/** @type {HTMLElement} */
const tempoText = document.querySelector('.tempo-text');

/** @type {HTMLElement} */
const decreaseTempoBtn = document.querySelector('.decrease-tempo');

/** @type {HTMLElement} */
const increaseTempoBtn = document.querySelector('.increase-tempo');

/** @type {HTMLElement} */
const tempoSlider = document.querySelector('.slider');

/** @type {HTMLElement} */
const startStopBtn = document.querySelector('.start-stop');

/** @type {HTMLElement} */
const subtractBeats = document.querySelector('.subtract-beats');

/** @type {HTMLElement} */
const addBeats = document.querySelector('.add-beats');

/** @type {HTMLElement} */
const measureCount = document.querySelector('.measure-count');


// Variables

/** @type {Number} */
let bpm: Number = 140;

/** @type {Number} */
let beatsPerMeasure: Number = 4;

