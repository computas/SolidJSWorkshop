import { SnakeBodyPart } from '../types/snake-body-part';

export function getHead(body: SnakeBodyPart[]): SnakeBodyPart {
  return body[body.length - 1];
}
