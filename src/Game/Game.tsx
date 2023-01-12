import { createSignal, createEffect, Show, createRenderEffect } from 'solid-js';
import GameConfig from '../game-config';
import Grid from '../Grid/Grid';
import { isFoodCollisionWithBody, isCollision } from '../helpers/collision';
import { getRandomFood, getHead } from '../helpers/get-body-part';
import { XMod, YMod } from '../helpers/position-map';
import { SnakeBodyPart } from '../types/snake-body-part';

import './Game.css';

export default () => {
  const [bodyParts, setBodyParts] = createSignal(GameConfig.initSnake);
  const [snakeLength, setSnakeLength] = createSignal(GameConfig.initSnake.length);
  const [direction, setDirection] = createSignal('right');
  const [score, setScore] = createSignal(0);
  const [isDead, setIsDead] = createSignal(false);
  const [food, setFood] = createSignal(getRandomFood());

  function setOppositeDirection(event: KeyboardEvent) {
    const dir = direction();
    if (event.key === 'ArrowRight' && dir !== 'left') setDirection('right');
    if (event.key === 'ArrowLeft' && dir !== 'right') setDirection('left');
    if (event.key === 'ArrowUp' && dir !== 'down') setDirection('up');
    if (event.key === 'ArrowDown' && dir !== 'up') setDirection('down');
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

  function reset() {
    setSnakeLength(GameConfig.initSnake.length);
    setDirection(getHead(GameConfig.initSnake).direction);
    setBodyParts(GameConfig.initSnake);
    setIsDead(false);
    setScore(0);
  }

  setInterval(() => setBodyParts(getNewBodyParts()), GameConfig.initSpeed);

  createRenderEffect(() => {
    document.body.addEventListener('keydown', setOppositeDirection);
  });

  createEffect(() => {
    const head = getHead(bodyParts());
    if (isCollision(head, bodyParts())) {
      setIsDead(true);
    }
  });

  createEffect(() => {
    const head = getHead(bodyParts());
    const eatFood = head.x === food().x && head.y === food().y;

    if (eatFood) {
      setNewRandomFood();
      setSnakeLength(snakeLength() + 1);
      setScore(score() + 1);
    }
  });

  return (
    <>
      <div>Score {score()}</div>
      <div class="container">
        <Show
          when={!isDead()}
          fallback={
            <div class="dead-message">
              <p>Omg you died!</p>
              <button onClick={reset}>Reset</button>
            </div>
          }
        >
          <Grid snake={bodyParts()} food={food()} />
        </Show>
      </div>
    </>
  );
};
