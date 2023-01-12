import GameConfig from '../game-config';
import { FoodType } from '../types/food-type';
import { SnakeBodyPart } from '../types/snake-body-part';

export function isOutOfBounds(head: SnakeBodyPart) {
  const isOutOfBoundsTopLeft = head.x < 0 || head.y < 0;
  const isOutOfBoundsBottomRight = head.x >= GameConfig.max || head.y >= GameConfig.max;
  return isOutOfBoundsTopLeft || isOutOfBoundsBottomRight;
}

export function isFoodCollisionWithBody(food: FoodType, body: SnakeBodyPart[]) {
  return body.some((part) => part.x === food.x && part.y === food.y);
}

export function isHeadCollisionWithBody(head: SnakeBodyPart, body: SnakeBodyPart[]) {
  return body.some((part) => part !== head && part.x === head.x && part.y === head.y);
}

export function isCollision(head: SnakeBodyPart, body: SnakeBodyPart[]) {
  return isOutOfBounds(head) || isHeadCollisionWithBody(head, body);
}
