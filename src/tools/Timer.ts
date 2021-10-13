export class Timer {
    private timeout: number;
    private handler: TimerHandler;
    private interval: number;

    public constructor(handler: TimerHandler, interval: number) {
        this.handler = handler;
        this.interval = interval;
        this.timeout = setInterval(handler, interval);
    }

    public start(): void {
        clearInterval(this.timeout);
        this.timeout = setInterval(this.handler, this.interval);
    }

    public stop(): void {
        clearInterval(this.timeout);
    }
}
