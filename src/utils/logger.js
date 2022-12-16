class Logger {
  constructor() {}

  log(...msg: any[]): void {
    if (__DEV__) {
      console.log(...msg);
    }
  }

  error(...msg: any[]): void {
    if (__DEV__) {
      console.error(...msg);
    }
  }
}

export default new Logger();
