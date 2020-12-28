export default class PositionOutOfBoundsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PositionOutOfBoundsError';
  }
}
