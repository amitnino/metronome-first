"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.measureCount = exports.addBeats = exports.subtractBeats = exports.startStopBtn = exports.tempoSlider = exports.increaseTempoBtn = exports.decreaseTempoBtn = exports.tempoText = exports.tempoDisplay = void 0;
/** @type {HTMLElement} */
exports.tempoDisplay = document.querySelector('.tempo');
/** @type {HTMLElement} */
exports.tempoText = document.querySelector('.tempo-text');
/** @type {HTMLElement} */
exports.decreaseTempoBtn = document.querySelector('.decrease-tempo');
/** @type {HTMLElement} */
exports.increaseTempoBtn = document.querySelector('.increase-tempo');
/** @type {HTMLElement} */
exports.tempoSlider = document.querySelector('.slider');
/** @type {HTMLElement} */
exports.startStopBtn = document.querySelector('.start-stop');
/** @type {HTMLElement} */
exports.subtractBeats = document.querySelector('.subtract-beats');
/** @type {HTMLElement} */
exports.addBeats = document.querySelector('.add-beats');
/** @type {HTMLElement} */
exports.measureCount = document.querySelector('.measure-count');
