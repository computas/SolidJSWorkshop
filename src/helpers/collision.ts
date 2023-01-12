import GameConfig from '../game-config';
import { SnakeBodyPart } from '../types/snake-body-part';

export function isOutOfBounds(head: SnakeBodyPart) {
  const isOutOfBoundsTopLeft = head.x < 0 || head.y < 0;
  const isOutOfBoundsBottomRight = head.x >= GameConfig.max || head.y >= GameConfig.max;
  return isOutOfBoundsTopLeft || isOutOfBoundsBottomRight;
}

export function isCollisionWithBody(head: SnakeBodyPart, body: SnakeBodyPart[]) {
  return body.some((part) => part !== head && part.x === head.x && part.y === head.y);
}
