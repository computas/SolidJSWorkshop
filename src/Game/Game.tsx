import { createSignal } from 'solid-js';
import GameConfig from '../game-config';
import Grid from '../Grid/Grid';
import { getHead } from '../helpers/get-body-part';
import { XMod, YMod } from '../helpers/position-map';
import { SnakeBodyPart } from '../types/snake-body-part';
import './Game.css';

export default () => {
  const [snake, setSnake] = createSignal(GameConfig.initSnake);
  const [direction, setDirection] = createSignal(getHead(GameConfig.initSnake).direction);

  setInterval(() => moveSnake(), GameConfig.initSpeed);

  function moveSnake(): void {
    const snakeBody = [...snake()];
    const head = getHead(snakeBody);
    snakeBody.shift();
    snakeBody.push(getMovedHead(head));
    setSnake(snakeBody);
  }

  function getMovedHead(part: SnakeBodyPart) {
    const x = part.x + XMod[direction()];
    const y = part.y + YMod[direction()];
    return { direction: direction(), x, y };
  }

  return (
    <div class="game-container">
      <div class="board-container">
        <Grid snake={snake()} />
      </div>
    </div>
  );
};
