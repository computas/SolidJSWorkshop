import { createSignal, createEffect, Show, createRenderEffect } from 'solid-js';

import Body from './Snake/Body';
import Food from './Food';
import { SnakeBodyPart } from './types/snake-body-part';
import GameConfig from './game-config';
import { getFood, getHead } from './helpers/get-body-part';
import { XMod, YMod } from './helpers/position-map';

import './Board.css';
import { isCollisionWithBody, isOutOfBounds } from './helpers/collision';

export default () => {
  const [speed, setSpeed] = createSignal(GameConfig.initSpeed);
  const [score, setScore] = createSignal(0);
  const [snakeLength, setSnakeLength] = createSignal(GameConfig.initSnake.length);
  const [isDead, setIsDead] = createSignal(false);
  const [bodyParts, setBodyParts] = createSignal(GameConfig.initSnake);
  const [food, setFood] = createSignal(getFood());
  const [direction, setDirection] = createSignal('right');

  function onKeyDown(event: KeyboardEvent) {
    const dir = direction();
    if (event.key === 'ArrowRight' && dir !== 'left') setDirection('right');
    if (event.key === 'ArrowLeft' && dir !== 'right') setDirection('left');
    if (event.key === 'ArrowUp' && dir !== 'down') setDirection('up');
    if (event.key === 'ArrowDown' && dir !== 'up') setDirection('down');
  }

  function getNewPart(part: SnakeBodyPart) {
    const x = part.x + XMod[direction()];
    const y = part.y + YMod[direction()];
    return { ...part, direction: direction(), x, y };
  }

  function getNewParts(): SnakeBodyPart[] {
    const body = [...bodyParts()];
    const head = getHead(body);
    if (body.length === snakeLength()) {
      body.shift();
    }

    body.push(getNewPart(head));
    return body;
  }

  function reset() {
    setSnakeLength(GameConfig.initSnake.length);
    setDirection('right');
    setBodyParts(GameConfig.initSnake);
    setIsDead(false);
  }

  createRenderEffect(() => {
    document.body.addEventListener('keydown', onKeyDown);
  });

  createEffect(() => {
    const head = getHead(bodyParts());
    const isCollision = isOutOfBounds(head) || isCollisionWithBody(head, bodyParts());
    if (isCollision) {
      setIsDead(true);
    }
  });

  createEffect(() => {
    const head = getHead(bodyParts());
    const eatFood = head.x === food().x && head.y === food().y;

    if (eatFood) {
      if (score() % GameConfig.speedIncrease === 0) {
        setSpeed(speed() - GameConfig.speedModifier);
      }
      setSnakeLength(snakeLength() + 1);
      setFood(getFood());
      setScore(score() + 1);
    }
  });

  // TODO: Need to set new interval on speedChange
  setInterval(() => {
    setBodyParts(getNewParts());
  }, speed());

  return (
    <>
      <div
        class="board"
        style={{
          height: `${GameConfig.max * 40}px`,
          width: `${GameConfig.max * 40}px`,
        }}
      >
        <Show
          when={!isDead()}
          fallback={
            <div class="dead-message">
              <p>Omg you died!</p>
              <button onClick={reset}>Reset</button>
            </div>
          }
        >
          <Body bodyParts={bodyParts()} />
          <Food pos={food()} />
        </Show>
      </div>
      <div>Score {score()}</div>
      <div>Speed {speed()}</div>
    </>
  );
};
