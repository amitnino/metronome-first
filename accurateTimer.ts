interface TimerInterface {

    /**
     * Function that runs once a round of an interval has finished.
     * @type {function}
     */
     callback: () => void | any;
    
     /**
      * Function that runs once an error has accurd.
      * @type {function}
      */
     errorCallback: () => void | any
 
     /**
      * The amount of miliseconds a round should be, entered by user.
      * @type {number}
      */
     timeInterval: number;

};

class Timer {
    
    /**
     * Function that runs once a round of an interval has finished.
     * @type {function}
     */
    callback: () => void | any;
    
    /**
     * Function that runs once an error has accurd.
     * @type {function}
     */
    errorCallback: () => void | any

    /**
     * The amount of miliseconds a round should be, entered by user.
     * @type {number}
     */
    timeInterval: number;

    /**
     * The expected milisecond Timeout instace should finish its count.
     * @type {number}
     */
    expectedTime: number;
    
    /**
     * An Instance of the current round.
     * @type {Timeout}
     */
    timeOut: ReturnType<typeof setTimeout>;

    constructor( callback: () => void | any, timeInterval: number, errorCallback: () => void | any ){
        this.timeInterval = timeInterval;
        this.callback = callback;
        this.errorCallback = errorCallback;
    };
    
    /**
     * Method that starts the timer.
     */
    public start: () => void = (): void => {
        this.expectedTime = Date.now() + this.timeInterval;
        this.timeOut = setTimeout(this.round, this.timeInterval);
        console.log('Started!');  
    };
    
    /**
     * Method that stops the timer.
     */
    public stop: () => void = (): void=> {
        clearTimeout(this.timeOut);
        console.log('Stopped');  
    };
    
    /**
     * Method that takes care of running our callback and adjusting the time interval.
     * On drift error, timer will stop, and if entered, error callback (errorCallback) will run.
     */
    public round: () => void = (): void => {
        /**
         * The calculated difference of miliseconds from expected time.
         * @type {number}
         */
        let drift: number = Date.now() - this.expectedTime;

        if (drift > this.timeInterval) {
            if (this.errorCallback){
                this.errorCallback();
            };
        };

        this.callback();
        this.expectedTime += this.timeInterval;
        this.timeOut = setTimeout(this.round, this.timeInterval - drift );
    };
};