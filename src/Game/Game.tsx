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
  const [score, setScore] = createSignal(0);
  // Oppgave 5.a: Lag getter og setter for isDead.

  setInterval(() => moveSnake(), GameConfig.initSpeed);

  document.body.addEventListener('keydown', ({ key }) => handleKey(key));

  createEffect(() => {
    /* Oppgave 5.c
     * Nå ønsker vi å sy sammen collision detection for
     * at slangen kræsjer med noe og sette isDead til tru.
     *
     * Vi kan her benytte oss av hjelpefunksjonen isCollision
     */
  });

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
      <div class="score-title">Score {score()}</div>

      <div class="board-container">
        {/** Oppgave 5.b:
         * Wrap Grid komponenten i en Show som vises basert på isDead.
         *
         * Vi ønsker nå også bruke en fallback (hvis when er false) som viser komponenten
         * DeadMessage.
         */}
        <Grid snake={snake()} food={food()} />
      </div>
    </div>
  );
};
