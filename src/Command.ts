import Direction from './Direction';
export default interface Command {
  name: string;
  coordinates?: Coordinates;
}
export interface Coordinates {
  xPosition: number;
  yPosition: number;
  direction: Direction;
}
