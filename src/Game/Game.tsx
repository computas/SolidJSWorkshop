import { createSignal, createEffect } from 'solid-js';
import GameConfig from '../game-config';
import Grid from '../Grid/Grid';
import { isFoodCollisionWithBody, isFoodCollision } from '../helpers/collision';
import { getHead, getRandomPos } from '../helpers/get-body-part';
import { XMod, YMod } from '../helpers/position-map';
import { SnakeBodyPart } from '../types/snake-body-part';

import './Game.css';

export default () => {
  const [snake, setSnake] = createSignal(GameConfig.initSnake);
  const [didEat, setDidEat] = createSignal(false);
  const [direction, setDirection] = createSignal(getHead(GameConfig.initSnake).direction);
  const [score, setScore] = createSignal(0);
  const [food, setFood] = createSignal(getRandomPos());

  setInterval(() => moveSnake(), GameConfig.initSpeed);

  document.body.addEventListener('keydown', (event) => handleKey(event.key));

  createEffect(() => {
    if (isFoodCollision(snake(), food())) {
      setNewRandomFood();
      setDidEat(true);
      setScore(score() + 1);
    }
  });

  function handleKey(key: string) {
    const head = getHead(snake());
    if (key === 'ArrowRight' && head.direction !== 'left') setDirection('right');
    if (key === 'ArrowLeft' && head.direction !== 'right') setDirection('left');
    if (key === 'ArrowUp' && head.direction !== 'down') setDirection('up');
    if (key === 'ArrowDown' && head.direction !== 'up') setDirection('down');
  }

  function getMovedHead(part: SnakeBodyPart) {
    const x = part.x + XMod[direction()];
    const y = part.y + YMod[direction()];
    return { ...part, direction: direction(), x, y };
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

  function setNewRandomFood() {
    let food = getRandomPos();
    while (isFoodCollisionWithBody(food, snake())) {
      food = getRandomPos();
    }
    setFood(food);
  }

  return (
    <div class="game-container">
      <div class="score-title">Score {score()}</div>

      <div class="board-container">
        <Grid snake={snake()} food={food()} />
      </div>
    </div>
  );
};
