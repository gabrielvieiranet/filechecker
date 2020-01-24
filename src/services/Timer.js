class Timer {
  constructor() {
    this.intervalHandler = null;
    this.interval = null;
    this.callback = null;
  }

  start({ interval = 10000, callback }) {
    this.interval = interval;
    this.callback = callback;
    this.intervalHandler = setInterval(() => this.callback(), this.interval);
  }

  stop() {
    clearInterval(this.intervalHandler);
  }
}

export default new Timer();
