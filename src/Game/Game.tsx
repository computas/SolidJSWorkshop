import { createSignal, createEffect, Show, createRenderEffect } from 'solid-js';
import GameConfig from '../game-config';
import Grid from '../Grid/Grid';
import { isFoodCollisionWithBody, isCollision, isFoodCollision } from '../helpers/collision';
import { getRandomFood, getHead } from '../helpers/get-body-part';
import { XMod, YMod } from '../helpers/position-map';
import { SnakeBodyPart } from '../types/snake-body-part';
import DeadMessage from './DeadMessage';

import './Game.css';
import Nokia from './Nokia';
import PixelOverlay from './PixelOverlay';

export default () => {
  const [snake, setSnake] = createSignal(GameConfig.initSnake);
  const [snakeLength, setSnakeLength] = createSignal(GameConfig.initSnake.length);
  const [direction, setDirection] = createSignal(getHead(GameConfig.initSnake).direction);
  const [score, setScore] = createSignal(0);
  const [isDead, setIsDead] = createSignal(false);
  const [food, setFood] = createSignal(getRandomFood());

  setInterval(() => moveSnake(), GameConfig.initSpeed);

  createRenderEffect(() => {
    document.body.addEventListener('keydown', (event) => setAllowedDirection(event.key));
  });

  // We could move all content of effects to setInterval
  createEffect(() => {
    if (isCollision(snake())) {
      setIsDead(true);
    }
  });

  createEffect(() => {
    if (isFoodCollision(snake(), food())) {
      setNewRandomFood();
      setSnakeLength(snakeLength() + 1);
      setScore(score() + 1);
    }
  });

  function setAllowedDirection(key: string) {
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
    if (snakeBody.length === snakeLength()) {
      snakeBody.shift();
    }

    snakeBody.push(getMovedHead(head));
    setSnake(snakeBody);
  }

  function setNewRandomFood() {
    let food = getRandomFood();
    while (isFoodCollisionWithBody(food, snake())) {
      food = getRandomFood();
    }
    setFood(food);
  }

  // Could we move is dead out and destroy this components so that its state is
  function reset() {
    setSnakeLength(GameConfig.initSnake.length);
    setDirection(getHead(GameConfig.initSnake).direction);
    setSnake(GameConfig.initSnake);
    setIsDead(false);
    setScore(0);
  }

  return (
    <>
      <Nokia resetClicked={reset} directionClicked={setAllowedDirection}>
        <div class="score-title">Score {score()}</div>

        <div class="game-container">
          <PixelOverlay />

          <Show when={!isDead()} fallback={<DeadMessage resetClicked={reset} />}>
            <Grid snake={snake()} food={food()} />
          </Show>
        </div>
      </Nokia>
    </>
  );
};
