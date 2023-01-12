import GameConfig from '../game-config';
import { FoodType } from '../types/food-type';
import { SnakeBodyPart } from '../types/snake-body-part';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getRandomFood(): FoodType {
  return {
    x: getRandomInt(GameConfig.max),
    y: getRandomInt(GameConfig.max),
  };
}

export function getHead(body: SnakeBodyPart[]): SnakeBodyPart {
  return body[body.length - 1];
}
