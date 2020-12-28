import * as Index from '../index';
import Robot from '../Robot';
import Board from '../Board';
import { ERROR_MESSAGES } from '../errors/ErrorMessages';

describe('test executeCommand() method', () => {
  let board: Board, robot: Robot;
  beforeEach(() => {
    board = new Board();
    robot = new Robot(board);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should output the correct value for sequence of commands', () => {
    const commands = ['PLACE 0,0,NORTH', 'MOVE', 'REPORT'];
    jest.spyOn(global.console, 'log');
    commands.map(async (command) => {
      Index.executeCommand(command, robot);
    });
    expect(global.console.log).toHaveBeenCalledWith('Output: 0,1,NORTH');
  });
  test('should output the correct value for sequence of commands', () => {
    const commands = ['PLACE 0,0,NORTH', 'LEFT', 'REPORT'];
    jest.spyOn(global.console, 'log');
    commands.forEach((command) => {
      Index.executeCommand(command, robot);
    });
    expect(global.console.log).toHaveBeenCalledWith('Output: 0,0,WEST');
  });
  test('should output the correct value for sequence of commands', () => {
    const commands = ['PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'REPORT'];
    jest.spyOn(global.console, 'log');
    commands.forEach((command) => {
      Index.executeCommand(command, robot);
    });
    expect(global.console.log).toHaveBeenCalledWith('Output: 3,3,NORTH');
  });
  test('should log error for incorrect commands', () => {
    const commands = ['PLACE 1,2,EAST', 'some undefined command'];
    jest.spyOn(global.console, 'error');
    commands.forEach((command) => {
      Index.executeCommand(command, robot);
    });
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should log error for invalid move', () => {
    const commands = ['PLACE 5,5,EAST', 'MOVE'];
    jest.spyOn(global.console, 'warn');
    commands.forEach((command) => {
      Index.executeCommand(command, robot);
    });
    expect(global.console.warn).toHaveBeenCalledTimes(1);
    expect(global.console.warn).toHaveBeenCalledWith(ERROR_MESSAGES.INVALID_MOVE);
  });
  test('should log error for invalid move', () => {
    const commands = ['PLACE 5,5,NORTH', 'MOVE'];
    jest.spyOn(global.console, 'warn');
    commands.forEach((command) => {
      Index.executeCommand(command, robot);
    });
    expect(global.console.warn).toHaveBeenCalledTimes(1);
    expect(global.console.warn).toHaveBeenCalledWith(ERROR_MESSAGES.INVALID_MOVE);
  });
  test('should log error for invalid move', () => {
    const commands = ['PLACE 0,0,WEST', 'MOVE'];
    jest.spyOn(global.console, 'warn');
    commands.forEach((command) => {
      Index.executeCommand(command, robot);
    });
    expect(global.console.warn).toHaveBeenCalledTimes(1);
    expect(global.console.warn).toHaveBeenCalledWith(ERROR_MESSAGES.INVALID_MOVE);
  });
  test('should log error for invalid place', () => {
    const commands = ['PLACE 0,0,NORTH', 'LEFT', 'PLACE 6,6,NORTH'];
    jest.spyOn(global.console, 'error');
    commands.forEach((command) => {
      Index.executeCommand(command, robot);
    });
    expect(global.console.error).toHaveBeenCalledTimes(1);
    expect(global.console.error).toHaveBeenCalledWith(ERROR_MESSAGES.CANNOT_PLACE);
  });
  test('should log warning if robot has not been placed yet', () => {
    const commands = ['LEFT', 'REPORT'];
    jest.spyOn(global.console, 'warn');
    commands.forEach((command) => {
      Index.executeCommand(command, robot);
    });
    expect(global.console.warn).toHaveBeenCalledTimes(2);
    expect(global.console.warn).toHaveBeenCalledWith(ERROR_MESSAGES.ROBOT_NOT_PLACED);
  });
});
describe('main() tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test(' should close readline if quit command is entered', () => {
    const readline = {
      createInterface: jest.fn().mockReturnValue({
        question: jest.fn().mockImplementationOnce((_questionTest, cb) => cb('quit')),
        close: jest.fn().mockImplementationOnce(() => undefined),
      }),
    };
    const mockReadLine = readline.createInterface();
    Index.main(mockReadLine);
    expect(mockReadLine.close).toHaveBeenCalledTimes(1);
  });

  it('should execute command if command is entered', () => {
    const readline = {
      createInterface: jest.fn().mockReturnValue({
        question: jest
          .fn()
          .mockImplementationOnce((_questionTest, cb) =>
            cb('Please enter a Robot command or type quit to exit the program?'),
          ),
        close: jest.fn().mockImplementationOnce(() => undefined),
      }),
    };
    const executeCommandSpy = jest.spyOn(Index, 'executeCommand');

    const mockReadLine = readline.createInterface();
    Index.main(mockReadLine);
    expect(executeCommandSpy).toHaveBeenCalledTimes(1);
  });
});
