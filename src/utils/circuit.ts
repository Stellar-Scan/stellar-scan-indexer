export class CircuitBreaker {
  private failures = 0;
  constructor(private threshold = 5) {}
  recordFailure() {
    this.failures += 1;
  }
  recordSuccess() {
    this.failures = 0;
  }
  isOpen() {
    return this.failures >= this.threshold;
  }
}
