export class CounterService {
  private activationCount = 0;
  private deactivationCount = 0;

  private logCounters = () => console.log({
    activations: this.activationCount,
    deactivations: this.deactivationCount
  })

  incrementActivationCount() {
    this.activationCount += 1;
    this.logCounters();
  }

  incrementDeactivationCount() {
    this.deactivationCount += 1;
    this.logCounters();
  }
}
