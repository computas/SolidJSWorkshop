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

  document.body.addEventListener('keydown', ({ key }) => handleKey(key));

  function handleKey(key: string) {
    const head = getHead(snake());
    /* Oppgave 3.b:
     * Lag en if sjekk for hver av verdiene key kan ha: "ArrowRight" | "ArrowLeft" | "ArrowUp" | "ArrowDown".
     * Husk at hvis slangen (hoded) allerede beveger seg i motsatt retning av key så er det ikke lovlig.
     * Altså hvis key er ArrowRight og head.direction === "left" så skal ingenting skje.
     *
     * Lovlig verdier for direction er "left" | "right" | "up" | "down"
     */
  }

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
