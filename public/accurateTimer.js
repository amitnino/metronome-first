"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
;
var Timer = /** @class */ (function () {
    function Timer(timeInterval, callback, errorCallback) {
        var _this = this;
        /**
         * Method that starts the timer.
         */
        this.start = function () {
            _this.expectedTime = Date.now() + _this.timeInterval;
            _this.timeOutInstance = setTimeout(_this.round, _this.timeInterval);
            console.log('Started!');
        };
        /**
         * Method that stops the timer.
         */
        this.stop = function () {
            clearTimeout(_this.timeOutInstance);
            console.log('Stopped');
        };
        /**
         * Method that takes care of running our callback and adjusting the time interval.
         * On drift error, timer will stop, and if entered, error callback (errorCallback) will run.
         */
        this.round = function () {
            /**
             * The calculated difference of miliseconds from expected time.
             * @type {number}
             */
            var drift = Date.now() - _this.expectedTime;
            if (drift > _this.timeInterval) {
                if (_this.errorCallback) {
                    _this.errorCallback();
                    return;
                }
                ;
            }
            ;
            _this.callback();
            _this.expectedTime += _this.timeInterval;
            _this.timeOutInstance = setTimeout(_this.round, _this.timeInterval - drift);
        };
        this.timeInterval = timeInterval;
        this.callback = callback;
        this.errorCallback = errorCallback;
        this.expectedTime = 0;
    }
    ;
    return Timer;
}());
exports.Timer = Timer;
;
