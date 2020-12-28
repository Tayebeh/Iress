import Robot from '../Robot';
import { DIRECTION } from '../Direction';
import { ERROR_MESSAGES } from '../errors/ErrorMessages';
import Board from '../Board';

let board: Board, robot: Robot;

beforeEach(() => {
  board = new Board();
  robot = new Robot(board);
});

describe('test place() method', () => {
  test('should place robot in the correct position', () => {
    robot.place(0, 0, DIRECTION.NORTH);
    expect(robot.direction).toBe(DIRECTION.NORTH);
    expect(robot.xPosition).toBe(0);
    expect(robot.yPosition).toBe(0);
  });

  test('should not place robot if the x and y positions are not valid positions on the board', () => {
    try {
      robot.place(6, 6, DIRECTION.NORTH);
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.CANNOT_PLACE);
    }
    expect(robot.direction).toBe(undefined);
    expect(robot.xPosition).toBe(undefined);
    expect(robot.yPosition).toBe(undefined);

    try {
      robot.place(5, 6, DIRECTION.NORTH);
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.CANNOT_PLACE);
    }
    expect(robot.direction).toBe(undefined);
    expect(robot.xPosition).toBe(undefined);
    expect(robot.yPosition).toBe(undefined);

    try {
      robot.place(-1, -1, DIRECTION.NORTH);
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.CANNOT_PLACE);
    }
    expect(robot.direction).toBe(undefined);
    expect(robot.xPosition).toBe(undefined);
    expect(robot.yPosition).toBe(undefined);
  });
});
describe('test move() method', () => {
  test('should move toy robot one unit forward along the y axis in the north direction', () => {
    robot.place(0, 0, DIRECTION.NORTH);
    robot.move();
    expect(robot.direction).toBe(DIRECTION.NORTH);
    expect(robot.xPosition).toBe(0);
    expect(robot.yPosition).toBe(1);
  });
  test('should move toy robot one unit forward along the y axis in the south direction', () => {
    robot.place(0, 1, DIRECTION.SOUTH);
    robot.move();
    expect(robot.direction).toBe(DIRECTION.SOUTH);
    expect(robot.xPosition).toBe(0);
    expect(robot.yPosition).toBe(0);
  });
  test('should move toy robot one unit forward along the X axis in the EAST direction', () => {
    robot.place(0, 0, DIRECTION.EAST);
    robot.move();
    expect(robot.direction).toBe(DIRECTION.EAST);
    expect(robot.xPosition).toBe(1);
    expect(robot.yPosition).toBe(0);
  });
  test('should move toy robot one unit forward along the X axis in the WEST direction', () => {
    robot.place(1, 0, DIRECTION.WEST);
    robot.move();
    expect(robot.direction).toBe(DIRECTION.WEST);
    expect(robot.xPosition).toBe(0);
    expect(robot.yPosition).toBe(0);
  });
  test('should not move toy robot if move is not valid', () => {
    robot.place(5, 5, DIRECTION.NORTH);
    try {
      robot.move();
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.INVALID_MOVE);
    }
    expect(robot.direction).toBe(DIRECTION.NORTH);
    expect(robot.xPosition).toBe(5);
    expect(robot.yPosition).toBe(5);

    robot.place(5, 5, DIRECTION.EAST);
    try {
      robot.move();
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.INVALID_MOVE);
    }
    expect(robot.direction).toBe(DIRECTION.EAST);
    expect(robot.xPosition).toBe(5);
    expect(robot.yPosition).toBe(5);

    robot.place(0, 0, DIRECTION.WEST);
    try {
      robot.move();
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.INVALID_MOVE);
    }
    expect(robot.direction).toBe(DIRECTION.WEST);
    expect(robot.xPosition).toBe(0);
    expect(robot.yPosition).toBe(0);
  });
  test('should return error if robot has not been placed before report command is run', () => {
    try {
      robot.move();
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.ROBOT_NOT_PLACED);
    }
  });
});
describe('test left() method', () => {
  test('should return error if robot has not been placed before left command is run', () => {
    try {
      robot.left();
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.ROBOT_NOT_PLACED);
    }
  });
  test('should move toy robot to the left of the current position', () => {
    robot.place(0, 0, DIRECTION.NORTH);
    robot.left();
    expect(robot.direction).toBe(DIRECTION.WEST);
    expect(robot.xPosition).toBe(0);
    expect(robot.yPosition).toBe(0);
  });
  test('should move toy robot to the left of the current position', () => {
    robot.place(0, 0, DIRECTION.WEST);
    robot.left();
    expect(robot.direction).toBe(DIRECTION.SOUTH);
    expect(robot.xPosition).toBe(0);
    expect(robot.yPosition).toBe(0);
  });
  test('should move toy robot to the left of the current position', () => {
    robot.place(0, 0, DIRECTION.SOUTH);
    robot.left();
    expect(robot.direction).toBe(DIRECTION.EAST);
    expect(robot.xPosition).toBe(0);
    expect(robot.yPosition).toBe(0);
  });
  test('should move toy robot to the left of the current position', () => {
    robot.place(0, 0, DIRECTION.EAST);
    robot.left();
    expect(robot.direction).toBe(DIRECTION.NORTH);
    expect(robot.xPosition).toBe(0);
    expect(robot.yPosition).toBe(0);
  });
});
describe('test right() method', () => {
  test('should return error if robot has not been placed before right command is run', () => {
    try {
      robot.right();
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.ROBOT_NOT_PLACED);
    }
  });
  test('should move toy robot to the right of the current position', () => {
    robot.place(0, 0, DIRECTION.NORTH);
    robot.right();
    expect(robot.direction).toBe(DIRECTION.EAST);
    expect(robot.xPosition).toBe(0);
    expect(robot.yPosition).toBe(0);
  });
  test('should move toy robot to the right of the current position', () => {
    robot.place(0, 0, DIRECTION.WEST);
    robot.right();
    expect(robot.direction).toBe(DIRECTION.NORTH);
    expect(robot.xPosition).toBe(0);
    expect(robot.yPosition).toBe(0);
  });
  test('should move toy robot to the right of the current position', () => {
    robot.place(0, 0, DIRECTION.SOUTH);
    robot.right();
    expect(robot.direction).toBe(DIRECTION.WEST);
    expect(robot.xPosition).toBe(0);
    expect(robot.yPosition).toBe(0);
  });
  test('should move toy robot to the right of the current position', () => {
    robot.place(0, 0, DIRECTION.EAST);
    robot.right();
    expect(robot.direction).toBe(DIRECTION.SOUTH);
    expect(robot.xPosition).toBe(0);
    expect(robot.yPosition).toBe(0);
  });
});
describe('test report() method', () => {
  test('should return the x,y axis and the direction of the robot ', () => {
    robot.place(0, 0, DIRECTION.EAST);
    jest.spyOn(global.console, 'log');
    robot.report();
    expect(global.console.log).toHaveBeenCalledWith('Output: 0,0,EAST');
  });
  test('should return error if robot has not been placed before report command is run', () => {
    try {
      robot.report();
    } catch (error) {
      expect(error.message).toBe(ERROR_MESSAGES.ROBOT_NOT_PLACED);
    }
  });
});
describe('test run() method', () => {
  test('should call the move command if move command is passed in', () => {
    const command = { name: 'MOVE' };
    jest.spyOn(robot, 'move');
    robot.run(command);
    expect(robot.move).toHaveBeenCalledTimes(1);
  });
  test('should call the right command if right command is passed in', () => {
    const command = { name: 'RIGHT' };
    jest.spyOn(robot, 'right');
    robot.run(command);
    expect(robot.right).toHaveBeenCalledTimes(1);
  });
  test('should call the left command if left command is passed in', () => {
    const command = { name: 'LEFT' };
    jest.spyOn(robot, 'left');
    robot.run(command);
    expect(robot.left).toHaveBeenCalledTimes(1);
  });
  test('should call the report command if report command is passed in', () => {
    const command = { name: 'REPORT' };
    jest.spyOn(robot, 'report');
    robot.run(command);
    expect(robot.report).toHaveBeenCalledTimes(1);
  });
  test('should call the place command if place command is passed in', () => {
    const command = { name: 'PLACE', coordinates: { xPosition: 0, yPosition: 0, direction: DIRECTION.NORTH } };
    jest.spyOn(robot, 'place');
    robot.run(command);
    expect(robot.place).toHaveBeenCalledTimes(1);
  });
  test('should log error if incorrect place command is passed in', () => {
    const command = { name: 'PLACE', coordinates: { xPosition: -1, yPosition: -1, direction: DIRECTION.NORTH } };
    jest.spyOn(global.console, 'error');
    jest.spyOn(robot, 'place');
    robot.run(command);
    expect(global.console.error).toHaveBeenCalledTimes(1);
    expect(robot.place).toHaveBeenCalledTimes(1);
  });
  test('should log error if incorrect place command is passed in', () => {
    const command = { name: 'PLACE' };
    jest.spyOn(robot, 'place');
    try {
      robot.run(command);
    } catch (error) {
      expect(error.message).toEqual(ERROR_MESSAGES.CANNOT_PLACE);
    }
    expect(robot.place).toHaveBeenCalledTimes(0);
  });
});
