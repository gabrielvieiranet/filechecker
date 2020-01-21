class FileChecker {
  constructor() {
    this.counter = 0;
    this.intervalHandler = null;
    this.interval = 10000;
  }

  start() {
    this.intervalHandler = setInterval(() => this.check(), this.interval);
  }

  stop() {
    clearInterval(this.intervalHandler);
  }

  check() {
    this.counter += 1;
    console.log(`Status: ${this.counter}`);
  }
}

export default new FileChecker();
