export interface TimerInterface {

    /**
     * The amount of miliseconds a round should be, entered by user.
     * @type {number}
     */
    timeInterval: number;
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
 
};

export class Timer { 

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
    public timeInterval: number;

    /**
     * The expected milisecond Timeout instace should finish its count.
     * @type {number}
     */
    expectedTime: number;
    
    /**
     * An Instance of the current round.
     * @type {Timeout}
     */
    timeOutInstance: ReturnType<typeof setTimeout> | undefined;

    constructor ( { timeInterval, callback, errorCallback }: TimerInterface ){
        this.timeInterval = timeInterval;
        this.callback = callback;
        this.errorCallback = errorCallback;
        this.expectedTime = 0;
    };
    
    /**
     * Method that starts the timer.
     */
    public start: () => void = (): void => {
        this.expectedTime = Date.now() + this.timeInterval;
        this.timeOutInstance = setTimeout(this.round, this.timeInterval);
        console.log('Started!');  
    };
    
    /**
     * Method that stops the timer.
     */
    public stop: () => void = (): void=> {
        clearTimeout(this.timeOutInstance);
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
                return;
            };
        };

        this.callback();
        this.expectedTime += this.timeInterval;
        this.timeOutInstance = setTimeout(this.round, this.timeInterval - drift );
    };
};
