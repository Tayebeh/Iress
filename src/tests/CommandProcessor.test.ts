import CommndProcessor from '../CommandProcessor';
import { DIRECTION } from '../Direction';
import { ERROR_MESSAGES } from '../errors/ErrorMessages';
describe('test parseCommand() method', () => {
  const commandProcessor = new CommndProcessor();
  test('should populate and return a valid object of type command if command is a valid command', () => {
    expect(commandProcessor.parseCommand('move')).toEqual({
      name: 'MOVE',
    });
  });
  test('should populate and return a valid object of type command if command is a valid place command', () => {
    expect(commandProcessor.parseCommand('place 0,0,north')).toEqual({
      name: 'PLACE',
      coordinates: { xPosition: 0, yPosition: 0, direction: DIRECTION.NORTH },
    });
  });
  test('should log an error if place command does not include position args', () => {
    try {
      commandProcessor.parseCommand('place');
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.INVALID_POSITION);
    }
  });
  test('should log an error if place command args have invalid direction', () => {
    try {
      commandProcessor.parseCommand('place 0,0,something');
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.INVALID_POSITION);
    }
  });
  test('should log an error if place command args have invalid position', () => {
    try {
      commandProcessor.parseCommand('place -1,-1,north');
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.INVALID_POSITION);
    }
  });
  test('should log an error if place command args are invalid', () => {
    try {
      commandProcessor.parseCommand('place a,b,north');
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.INVALID_POSITION);
    }

    try {
      commandProcessor.parseCommand('place abnorth');
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.INVALID_POSITION);
    }
  });
  test('should log an error if command is invalid', () => {
    try {
      commandProcessor.parseCommand('someCommand');
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.INVALID_COMMAND);
    }
  });
});
