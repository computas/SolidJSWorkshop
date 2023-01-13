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
  const [bodyParts, setBodyParts] = createSignal(GameConfig.initSnake);
  const [snakeLength, setSnakeLength] = createSignal(GameConfig.initSnake.length);
  const [direction, setDirection] = createSignal(getHead(GameConfig.initSnake).direction);
  const [score, setScore] = createSignal(0);
  const [isDead, setIsDead] = createSignal(false);
  const [food, setFood] = createSignal(getRandomFood());

  setInterval(() => setBodyParts(getNewBodyParts()), GameConfig.initSpeed);

  createRenderEffect(() => {
    document.body.addEventListener('keydown', (event) => setAllowedDirection(event.key));
  });

  createEffect(() => {
    if (isCollision(bodyParts())) {
      setIsDead(true);
    }
  });

  createEffect(() => {
    if (isFoodCollision(bodyParts(), food())) {
      setNewRandomFood();
      setSnakeLength(snakeLength() + 1);
      setScore(score() + 1);
    }
  });

  function setAllowedDirection(key: string) {
    const dir = direction();
    if (key === 'ArrowRight' && dir !== 'left') setDirection('right');
    if (key === 'ArrowLeft' && dir !== 'right') setDirection('left');
    if (key === 'ArrowUp' && dir !== 'down') setDirection('up');
    if (key === 'ArrowDown' && dir !== 'up') setDirection('down');
  }

  function getNewBodyPart(part: SnakeBodyPart) {
    const x = part.x + XMod[direction()];
    const y = part.y + YMod[direction()];
    return { ...part, direction: direction(), x, y };
  }

  function getNewBodyParts(): SnakeBodyPart[] {
    const body = [...bodyParts()];
    const head = getHead(body);
    if (body.length === snakeLength()) {
      body.shift();
    }

    body.push(getNewBodyPart(head));
    return body;
  }

  function setNewRandomFood() {
    let food = getRandomFood();
    while (isFoodCollisionWithBody(food, bodyParts())) {
      food = getRandomFood();
    }
    setFood(food);
  }

  // Could we move is dead out and destroy this components so that its state is
  function reset() {
    setSnakeLength(GameConfig.initSnake.length);
    setDirection(getHead(GameConfig.initSnake).direction);
    setBodyParts(GameConfig.initSnake);
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
            <Grid snake={bodyParts()} food={food()} />
          </Show>
        </div>
      </Nokia>
    </>
  );
};
