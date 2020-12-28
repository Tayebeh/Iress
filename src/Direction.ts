export default interface Direction {
  name: string;
  xMovement: number;
  yMovement: number;
  left: string;
  right: string;
}
export const DIRECTION: {
  [key: string]: Direction;
} = {
  NORTH: { name: 'NORTH', xMovement: 0, yMovement: 1, left: 'WEST', right: 'EAST' },
  SOUTH: { name: 'SOUTH', xMovement: 0, yMovement: -1, left: 'EAST', right: 'WEST' },
  EAST: { name: 'EAST', xMovement: 1, yMovement: 0, left: 'NORTH', right: 'SOUTH' },
  WEST: { name: 'WEST', xMovement: -1, yMovement: 0, left: 'SOUTH', right: 'NORTH' },
};
