import { SnakeBodyPart } from './types/snake-body-part';

type GameConfigType = {
  /** Object of the initial snake with its position and direction */
  initSnake: SnakeBodyPart[];
  // How many cells per row the grid should have
  gridSize: number;
  // ms tick speed the game should run in
  initSpeed: number;
};

const GameConfig: GameConfigType = {
  initSnake: [
    { x: 0, y: 0 },
    { direction: 'right', x: 1, y: 0 },
  ],
  gridSize: 15,
  initSpeed: 150,
};

export default GameConfig;
