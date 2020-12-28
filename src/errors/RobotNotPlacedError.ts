export default class RobotNotPlacedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RobotNotPlacedError';
  }
}
