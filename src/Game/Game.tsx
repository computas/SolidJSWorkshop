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
  /* Oppgave 4.a:
   * Lag setter og getter for food og sett start verdi til funksjonen getRandomPos();
   * Send så inn food som argument i Grid komponenten vår
   */

  // Oppgave 4.b: Lag setter og getter for didEat og sett start verdi til false

  // Oppgave 4.c Lag setter og getter for score og sett start verdi til 0

  setInterval(() => moveSnake(), GameConfig.initSpeed);

  document.body.addEventListener('keydown', ({ key }) => handleKey(key));

  createEffect(() => {
    /* Oppgave 4.d:
     * Nå mangler vi bare collision detection for
     * slangehode og mat.
     * Som vi husker vil koden i createEffect kjøre hver gang
     * verdien er endret til noen av getterne som vi bruker her inne.
     *
     * Vi ønsker å sjekke if hjelpefunksjonen isFoodCollision med argumentene
     * snake og food. Hvis denne er true, setter vi en ny verdi på food med
     * funksjonen setNewRandomFood.
     *
     * Og for å signalisere at slangen skal bli lengre setter vi didEat
     * til true.
     *
     * Vi øker også å øke score med 1
     */
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

    /* Oppgave 4.b:
     * Lag en if sjekk på didEat()
     * Hvis denne er true setter vi den til false.
     * Ellers så kaller vi på snakeBody.shift.
     * Siden shift vil fjerne en bit på slangen vil vi
     * på denne måten la slangen bli lengre hvis den har spist.
     */
    snakeBody.shift();

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
        <Grid snake={snake()} />
      </div>
    </div>
  );
};
