import GameConfig from '../game-config';
import { Pos } from '../types/pos';
import { SnakeBodyPart } from '../types/snake-body-part';

import './Grid.css';
import { Component, Show } from 'solid-js';
import BodyPart from '../BodyPart/BodyPart';

/**Grid */

type GridProps = {
  snake: SnakeBodyPart[];
};

const Grid: Component<GridProps> = (props) => {
  const emptyArrayWithXEntries = Array(GameConfig.gridSize);
  const cellIndexes = Array.from(emptyArrayWithXEntries.keys());

  return (
    <div
      class="grid"
      style={{
        'grid-template-columns': `repeat(${GameConfig.gridSize}, minmax(0, 1fr))`,
        'grid-template-rows': `repeat(${GameConfig.gridSize}, minmax(0, 1fr))`,
      }}
    >
      {cellIndexes.map((y) => (
        <>
          {cellIndexes.map((x) => (
            <Cell x={x} y={y} snake={props.snake}></Cell>
          ))}
        </>
      ))}
    </div>
  );
};

export default Grid;

/** Cell */

type CellProps = {
  x: number;
  y: number;
  snake: SnakeBodyPart[];
};

const Cell: Component<CellProps> = (props) => {
  function containsBodyPart() {
    return props.snake.find((part) => part.x === props.x && part.y === props.y);
  }

  return (
    <div>
      {/*Oppgave 2.d: Wrap <BodyPart /> i Show og bruk containsBodyPart i when attribtuttet */}
      <BodyPart />
    </div>
  );
};
