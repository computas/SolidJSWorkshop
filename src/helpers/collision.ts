import GameConfig from '../game-config';
import { FoodType } from '../types/food-type';
import { SnakeBodyPart } from '../types/snake-body-part';
import { getHead } from './get-body-part';

export function isOutOfBounds(head: SnakeBodyPart) {
  const isOutOfBoundsTopLeft = head.x < 0 || head.y < 0;
  const isOutOfBoundsBottomRight = head.x >= GameConfig.gridSize || head.y >= GameConfig.gridSize;
  return isOutOfBoundsTopLeft || isOutOfBoundsBottomRight;
}

export function isFoodCollisionWithBody(food: FoodType, body: SnakeBodyPart[]) {
  return body.some((part) => part.x === food.x && part.y === food.y);
}

export function isHeadCollisionWithBody(head: SnakeBodyPart, body: SnakeBodyPart[]) {
  return body.some((part) => part !== head && part.x === head.x && part.y === head.y);
}

export function isCollision(body: SnakeBodyPart[]) {
  const head = getHead(body);
  return isOutOfBounds(head) || isHeadCollisionWithBody(head, body);
}

export function isFoodCollision(body: SnakeBodyPart[], food: FoodType) {
  const head = getHead(body);
  return head.x === food.x && head.y === food.y;
}
