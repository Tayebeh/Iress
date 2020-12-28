export default class Board {
  private _xDimension: number;
  private _yDimension: number;

  constructor(xDimention?: number, yDimension?: number) {
    if (xDimention && yDimension && xDimention > 0 && yDimension > 0) {
      this._xDimension = xDimention;
      this._yDimension = yDimension;
    } else {
      this._xDimension = 5;
      this._yDimension = 5;
    }
  }
  get xDimension(): number {
    return this._xDimension;
  }
  get yDimension(): number {
    return this._yDimension;
  }
  isInsideBoard(xPosition: number, yPosition: number): boolean {
    return yPosition <= this._yDimension && yPosition >= 0 && xPosition <= this._xDimension && xPosition >= 0;
  }
}
