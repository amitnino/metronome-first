;
export class Timer {
    constructor({ timeInterval, callback, errorCallback }) {
        /**
         * Method that starts the timer.
         */
        this.start = () => {
            this.expectedTime = Date.now() + this.timeInterval;
            this.timeOutInstance = setTimeout(this.round, this.timeInterval);
            console.log('Started!');
        };
        /**
         * Method that stops the timer.
         */
        this.stop = () => {
            clearTimeout(this.timeOutInstance);
            console.log('Stopped');
        };
        /**
         * Method that takes care of running our callback and adjusting the time interval.
         * On drift error, timer will stop, and if entered, error callback (errorCallback) will run.
         */
        this.round = () => {
            /**
             * The calculated difference of miliseconds from expected time.
             * @type {number}
             */
            let drift = Date.now() - this.expectedTime;
            if (drift > this.timeInterval) {
                if (this.errorCallback) {
                    this.errorCallback();
                    return;
                }
                ;
            }
            ;
            this.callback();
            this.expectedTime += this.timeInterval;
            this.timeOutInstance = setTimeout(this.round, this.timeInterval - drift);
        };
        this.timeInterval = timeInterval;
        this.callback = callback;
        this.errorCallback = errorCallback;
        this.expectedTime = 0;
    }
    ;
}
;
