import Timer = NodeJS.Timer;

class IntervalTimer {
  /**
   * 0 = idle, 1 = running, 2 = paused, 3 = resumed
   * @type {number}
   */
  public state: number;

  private readonly callback: () => void;
  private readonly runtime: number;
  private readonly interval: number;

  private runtimeId: Timer;
  private timerId: Timer;
  private startTime: number;
  private remaining: number;

  public constructor(
    callback: () => void,
    interval: number,
    runtime: number = null
  ) {
    this.interval = interval;
    this.callback = callback;

    if (runtime) {
      this.runtime = runtime;
    }

    this.remaining = 0;
    this.state = 0;
  }

  public pause() {
    if (this.state !== 1) {
      return;
    }

    this.remaining = this.interval - (new Date().getTime() - this.startTime);
    clearInterval(this.timerId);
    this.state = 2;
  }

  public resume() {
    if (this.state !== 2) {
      return;
    }

    this.state = 3;
    setTimeout(this.timeoutCallback.bind(this), this.remaining);
  }

  public reset() {
    this.stop();
    this.start();
  }

  public stop() {
    if (this.runtimeId) {
      clearTimeout(this.runtimeId);
    }

    clearInterval(this.timerId);
    this.state = 0;
    this.remaining = 0;
  }

  public start() {
    this.startTime = new Date().getTime();
    this.timerId = setInterval(this.callback, this.interval);
    this.state = 1;

    if (this.runtime) {
      this.runtimeId = setTimeout(() => {
        this.stop();
      }, this.runtime);
    }
  }

  private timeoutCallback() {
    if (this.state !== 3) {
      return;
    }

    this.callback();

    this.startTime = new Date().getTime();
    this.timerId = setInterval(this.callback, this.interval);
    this.state = 1;
  }
}

export default IntervalTimer;
