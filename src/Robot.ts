import Board from './Board';
import Direction, { DIRECTION } from './Direction';
import Command from './Command';
import PositionOutOfBoundsError from './errors/RobotNotPlacedError';
import RobotNotPlacedError from './errors/RobotNotPlacedError';
import { ERROR_MESSAGES } from './errors/ErrorMessages';

export default class Robot {
  private _direction: Direction;
  private _xPosition: number;
  private _yPosition: number;
  private _board: Board;
  private _isPlaced: boolean;

  constructor(board: Board) {
    this._board = board;
    this._isPlaced = false;
  }

  get direction(): Direction | undefined {
    return this._direction;
  }
  get xPosition(): number | undefined {
    return this._xPosition;
  }
  get yPosition(): number | undefined {
    return this._yPosition;
  }

  /**
   * PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
   * should not palce the robot if position is not a valid position on the board.
   * @param xPosition position on the x axis
   * @param yPosition position on the y axis
   * @param direction direction the robot is facing
   */
  place(xPosition: number, yPosition: number, direction: Direction): void {
    if (this._board.isInsideBoard(xPosition, yPosition)) {
      this._xPosition = xPosition;
      this._yPosition = yPosition;
      this._direction = direction;
      this._isPlaced = true;
    } else {
      throw new PositionOutOfBoundsError(ERROR_MESSAGES.CANNOT_PLACE);
    }
  }
  /**
   * MOVE will move the toy robot one unit forward in the direction it is currently facing but robot should not fall off the board.
   * does not perform the move if robot has not been placed
   */
  move(): void {
    if (this._isPlaced) {
      const newXPosition = this._xPosition + this._direction.xMovement;
      const newYPosition = this._yPosition + this._direction.yMovement;
      if (this._board.isInsideBoard(newXPosition, newYPosition)) {
        this._xPosition = newXPosition;
        this._yPosition = newYPosition;
      } else {
        throw new PositionOutOfBoundsError(ERROR_MESSAGES.INVALID_MOVE);
      }
    } else {
      throw new RobotNotPlacedError(ERROR_MESSAGES.ROBOT_NOT_PLACED);
    }
  }
  /**
   * Rotates the robot to the left of it's current facing direction
   * does not perform the command if robot has not been placed
   */
  left(): void {
    if (this._isPlaced) {
      this._direction = DIRECTION[`${this._direction.left}`];
    } else {
      throw new RobotNotPlacedError(ERROR_MESSAGES.ROBOT_NOT_PLACED);
    }
  }
  /**
   * Rotates the robot to the right of it's current facing direction
   * does not perform the command if robot has not been placed
   */
  right(): void {
    if (this._isPlaced) {
      this._direction = DIRECTION[`${this._direction.right}`];
    } else {
      throw new RobotNotPlacedError(ERROR_MESSAGES.ROBOT_NOT_PLACED);
    }
  }

  report(): void {
    if (this._isPlaced) {
      console.log(`Output: ${this._xPosition},${this._yPosition},${this._direction.name}`);
    } else {
      throw new RobotNotPlacedError(ERROR_MESSAGES.ROBOT_NOT_PLACED);
    }
  }
  run(command: Command): void {
    switch (command.name) {
      case 'PLACE':
        if (command.coordinates) {
          const { xPosition, yPosition, direction } = command.coordinates;
          try {
            this.place(xPosition, yPosition, direction);
          } catch (error) {
            console.error(error.message);
          }
        } else {
          throw new PositionOutOfBoundsError(ERROR_MESSAGES.CANNOT_PLACE);
        }
        break;
      case 'MOVE':
        try {
          this.move();
        } catch (error) {
          console.warn(error.message);
        }
        break;
      case 'LEFT':
        try {
          this.left();
        } catch (error) {
          console.warn(error.message);
        }
        break;
      case 'RIGHT':
        try {
          this.right();
        } catch (error) {
          console.warn(error.message);
        }
        break;
      case 'REPORT':
        try {
          this.report();
        } catch (error) {
          console.warn(error.message);
        }
        break;
    }
  }
}
