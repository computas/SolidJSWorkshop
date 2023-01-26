import { Pos } from '../types/pos';
import { SnakeBodyPart } from '../types/snake-body-part';

export function getRandomPos(): Pos {
  // Funksjon for å hente ut ny random posisjon for mat
}

export function getHead(body: SnakeBodyPart[]): SnakeBodyPart {
  return body[body.length - 1];
}
