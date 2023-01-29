import { createEffect, createSignal } from 'solid-js';
import GameConfig from '../game-config';
import Grid from '../Grid/Grid';
import { isFoodCollision, isFoodCollisionWithBody } from '../helpers/collision';
import { getHead, getRandomPos } from '../helpers/get-body-part';
import { XMod, YMod } from '../helpers/position-map';
import { SnakeBodyPart } from '../types/snake-body-part';
import './Game.css';

export default () => {
  const [snake, setSnake] = createSignal(GameConfig.initSnake);
  const [direction, setDirection] = createSignal(getHead(GameConfig.initSnake).direction);
  const [food, setFood] = createSignal(getRandomPos());
  const [didEat, setDidEat] = createSignal(false);

  setInterval(() => moveSnake(), GameConfig.initSpeed);

  document.body.addEventListener('keydown', ({ key }) => handleKey(key));

  createEffect(() => {
    if (isFoodCollision(snake(), food())) {
      setNewRandomFood();
      setDidEat(true);
    }
  });

  function handleKey(key: string) {
    const head = getHead(snake());
    if (key === 'ArrowRight' && head.direction !== 'left') setDirection('right');
    if (key === 'ArrowLeft' && head.direction !== 'right') setDirection('left');
    if (key === 'ArrowUp' && head.direction !== 'down') setDirection('up');
    if (key === 'ArrowDown' && head.direction !== 'up') setDirection('down');
  }

  function moveSnake(): void {
    const snakeBody = [...snake()];
    const head = getHead(snakeBody);

    if (didEat()) {
      setDidEat(false);
    } else {
      snakeBody.shift();
    }

    snakeBody.push(getMovedHead(head));
    setSnake(snakeBody);
  }

  function getMovedHead(part: SnakeBodyPart) {
    const x = part.x + XMod[direction()];
    const y = part.y + YMod[direction()];
    return { direction: direction(), x, y };
  }

  function setNewRandomFood() {
    let food = getRandomPos();
    while (isFoodCollisionWithBody(food, snake())) {
      food = getRandomPos();
    }
    setFood(food);
  }

  return (
    <div class="game-container">
      <div class="board-container">
        <Grid snake={snake()} />
      </div>
    </div>
  );
};
