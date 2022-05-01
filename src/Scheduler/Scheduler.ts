export class Scheduler {
    private setInterval = (handler: TimerHandler, timeout: number) => window.setInterval(handler, timeout);
    private clearInterval = (id: number) => window.clearInterval(id);
    private intervalId: number | null = null;

    constructor(private action: () => void, private timeout: number) { }

    public start() {
        this.intervalId = this.setInterval(this.action, this.timeout);
    }

    public stop() {
        if (this.intervalId) {
            this.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
