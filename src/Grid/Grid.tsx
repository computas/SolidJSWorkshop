import GameConfig from '../game-config';
import { SnakeBodyPart } from '../types/snake-body-part';

import './Grid.css';
import { Component, Show } from 'solid-js';
import BodyPart from '../BodyPart/BodyPart';
import { Pos } from '../types/pos';
import Food from '../Food/Food';

/**Grid */

type GridProps = {
  snake: SnakeBodyPart[];
  food: Pos;
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
            <Cell x={x} y={y} snake={props.snake} food={food}></Cell>
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
  food: Pos;
};

const Cell: Component<CellProps> = (props) => {
  function containsFood() {
    return props.food.x === props.x && props.food.y === props.y;
  }

  function containsBodyPart() {
    return props.snake.find((part) => part.x === props.x && part.y === props.y);
  }

  return (
    <div>
      <Show when={containsBodyPart()}>
        <BodyPart />
      </Show>

      <Show when={containsFood()}>
        <Food />
      </Show>
    </div>
  );
};
