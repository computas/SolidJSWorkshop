import { createSignal } from 'solid-js';
import GameConfig from '../game-config';
import Grid from '../Grid/Grid';
import { getHead } from '../helpers/get-body-part';
import { XMod, YMod } from '../helpers/position-map';
import { SnakeBodyPart } from '../types/snake-body-part';
import './Game.css';

export default () => {
  /*
   * Oppgave 2.a:
   * Lag createSignals med getter og setter for "snake" og "direction".
   * Startverdi skal komme fra GameConfig.
   */

  /*
   * Oppgave 2.b:
   * Opprett en setInterval som kaller på funksjonen
   * moveSnake og kjører på initSpeed fra GameConfig
   */

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
        {/* Oppgave 2.c: Send snake getter inn som props til grid */}
        <Grid />
      </div>
    </div>
  );
};
