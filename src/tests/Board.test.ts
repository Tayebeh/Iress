import Board from '../Board';

describe('test isInsideBoard() method', () => {
  const board = new Board();
  test('should return true if the provided position is inside the dimensions of the board', () => {
    expect(board.isInsideBoard(0, 0)).toBeTruthy();
    expect(board.isInsideBoard(3, 4)).toBeTruthy();
    expect(board.isInsideBoard(5, 5)).toBeTruthy();
  });
  test('should return false if the provided position is outside the dimensions of the board', () => {
    expect(board.isInsideBoard(-1, -1)).toBeFalsy();
    expect(board.isInsideBoard(-1, 0)).toBeFalsy();
    expect(board.isInsideBoard(0, -1)).toBeFalsy();
    expect(board.isInsideBoard(6, 6)).toBeFalsy();
    expect(board.isInsideBoard(5, 6)).toBeFalsy();
    expect(board.isInsideBoard(6, 5)).toBeFalsy();
  });
});
describe('test board diemensions', () => {
  test('should set the board dimentions to 5,5 if negative dimension is provided', () => {
    const board = new Board(-1, -1);
    expect(board.xDimension).toBe(5);
    expect(board.yDimension).toBe(5);
  });
  test('should set the board dimentions to the default 5,5 if 0 or any invalid type of dimension is provided', () => {
    const board1 = new Board(0, 0);
    expect(board1.xDimension).toBe(5);
    expect(board1.yDimension).toBe(5);

    const board2 = new Board(0, 1);
    expect(board2.xDimension).toBe(5);
    expect(board2.yDimension).toBe(5);

    const board3 = new Board(1, 0);
    expect(board3.xDimension).toBe(5);
    expect(board3.yDimension).toBe(5);

    const board5 = new Board(undefined, undefined);
    expect(board5.xDimension).toBe(5);
    expect(board5.yDimension).toBe(5);
  });
  test('should set the dimension correctly if dimensions are grater than zero', () => {
    const board = new Board(3, 3);
    expect(board.xDimension).toBe(3);
    expect(board.yDimension).toBe(3);

    const board1 = new Board(5, 6);
    expect(board1.xDimension).toBe(5);
    expect(board1.yDimension).toBe(6);
  });
});
