import { makeAudio } from '@solid-primitives/audio';
import { createSignal, createEffect, Show, createRenderEffect } from 'solid-js';
import GameConfig from '../game-config';
import Grid from '../Grid/Grid';
import { isFoodCollisionWithBody, isCollision, isFoodCollision } from '../helpers/collision';
import { getHead, getRandomPos } from '../helpers/get-body-part';
import { XMod, YMod } from '../helpers/position-map';
import { SnakeBodyPart } from '../types/snake-body-part';
import DeadMessage from './DeadMessage';

import './Game.css';
import Nokia from './Nokia';
import PixelOverlay from './PixelOverlay';

export default () => {
  const [snake, setSnake] = createSignal(GameConfig.initSnake);
  const [didEat, setDidEat] = createSignal(false);
  const [direction, setDirection] = createSignal(getHead(GameConfig.initSnake).direction);
  const [score, setScore] = createSignal(0);
  const [isDead, setIsDead] = createSignal(false);
  const [food, setFood] = createSignal(getRandomPos());
  const player = makeAudio('src/blip2.m4a');

  setInterval(() => moveSnake(), GameConfig.initSpeed);

  createRenderEffect(() => {
    document.body.addEventListener('keydown', (event) => handleKey(event.key));
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
      setDidEat(true);
      player.play();
      setScore(score() + 1);
    }
  });

  function handleKey(key: string) {
    if (key === 'r' && isDead()) reset();

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

  // Could we move is dead out and destroy this components so that its state is
  function reset() {
    setDirection(getHead(GameConfig.initSnake).direction);
    setSnake(GameConfig.initSnake);
    setDidEat(false);
    setIsDead(false);
    setScore(0);
  }

  return (
    <div class="game-container">
      <div class="score-title">Score {score()}</div>

      <div class="board-container">
        <PixelOverlay />

        <Show when={!isDead()} fallback={<DeadMessage />}>
          <Grid snake={snake()} food={food()} />
        </Show>
      </div>
    </div>
  );
};
