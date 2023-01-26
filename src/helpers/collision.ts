import { Pos } from '../types/pos';
import { SnakeBodyPart } from '../types/snake-body-part';
import { getHead } from './get-body-part';

export function isFoodCollisionWithBody(food: Pos, body: SnakeBodyPart[]) {
  return body.some((part) => part.x === food.x && part.y === food.y);
}

export function isCollision(body: SnakeBodyPart[]) {
  // Sjekk for collisjon med kropp eller out of bounds her
}

export function isFoodCollision(body: SnakeBodyPart[], food: Pos) {
  const head = getHead(body);
  return head.x === food.x && head.y === food.y;
}
