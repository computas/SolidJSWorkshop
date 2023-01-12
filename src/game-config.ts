import { SnakeBodyPart } from './types/snake-body-part';

type GameConfigType = {
  /** Object of the initial snake with its position and direction */
  initSnake: SnakeBodyPart[];
  size: number;
  max: number;
  initSpeed: number;
  speedIncrease: number;
  speedModifier: number;
};

const GameConfig: GameConfigType = {
  initSnake: [
    {
      direction: 'right',
      x: 0,
      y: 0,
      id: '0',
    },
    {
      direction: 'right',
      x: 1,
      y: 0,
      id: '0',
    },
  ],
  size: 15,
  max: 15,
  initSpeed: 200,
  speedIncrease: 3,
  speedModifier: 10,
};

export default GameConfig;
