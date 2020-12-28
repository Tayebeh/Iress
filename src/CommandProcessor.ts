import { DIRECTION } from './Direction';
import { ERROR_MESSAGES } from './errors/ErrorMessages';
import Command from './Command';
import { Coordinates } from './Command';
import PositionOutOfBoundsError from './errors/PositionOutOfBoundsError';
import InvalidCommandError from './errors/InvalidCommandError';

export default class CommandProcessor {
  validCommands = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];

  private isValidCommandName(command: string): boolean {
    return this.validCommands.includes(command);
  }

  public parseCommand(commandInput: string): Command | undefined {
    commandInput = commandInput.trim();
    const [name, position] = commandInput.split(' ');
    const command: Command = { name: '' };
    command.name = name.toUpperCase();
    if (position) {
      command.coordinates = this.processCoordinates(position);
    }
    try {
      return this.validateCommand(command);
    } catch (error) {
      if (error instanceof PositionOutOfBoundsError) {
        throw new PositionOutOfBoundsError(error.message);
      } else {
        throw new InvalidCommandError(error.message);
      }
    }
  }

  private validateCommand(command: Command): Command {
    if (this.isValidCommandName(command.name)) {
      if (command.name === 'PLACE') {
        if (!command.coordinates) {
          throw new PositionOutOfBoundsError(ERROR_MESSAGES.INVALID_POSITION);
        }
      }
      return command;
    } else {
      throw new InvalidCommandError(ERROR_MESSAGES.INVALID_COMMAND);
    }
  }
  private processCoordinates(position: string): Coordinates {
    if (position && position.includes(',')) {
      const [x, y, face] = position.split(',');
      const xPosition = Number.parseInt(x);
      const yPosition = Number.parseInt(y);
      if (isNaN(xPosition) || isNaN(yPosition) || !DIRECTION[face.toUpperCase()]) {
        return;
      } else {
        const direction = DIRECTION[face.toUpperCase()];
        return { xPosition, yPosition, direction };
      }
    } else {
      return;
    }
  }
}
