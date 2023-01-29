import GameConfig from '../game-config';
import { Pos } from '../types/pos';
import { SnakeBodyPart } from '../types/snake-body-part';

import './Grid.css';
import { Component } from 'solid-js';

/**Grid */

type GridProps = {
  food: Pos;
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
            <Cell {...{ x, y, ...props }}></Cell>
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
};

const Cell: Component<CellProps> = (props) => {
  return <div>cell</div>;
};
