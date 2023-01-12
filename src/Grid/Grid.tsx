import { Show } from 'solid-js';
import Food from '../Food/Food';
import GameConfig from '../game-config';
import { Pos } from '../types/pos';
import { SnakeBodyPart } from '../types/snake-body-part';

import './Grid.css';
import Cell from './Cell';

type Props = {
  food: Pos;
  snake: SnakeBodyPart[];
};

export default (props: Props) => {
  const size = Array.from(Array(GameConfig.gridSize).keys());

  return (
    <div
      class="grid"
      style={{
        'grid-template-columns': `repeat(${GameConfig.gridSize}, minmax(0, 1fr))`,
        'grid-template-rows': `repeat(${GameConfig.gridSize}, minmax(0, 1fr))`,
      }}
    >
      {size.map((y) => (
        <>
          {size.map((x) => (
            <Cell {...{ x, y, ...props }}></Cell>
          ))}
        </>
      ))}
    </div>
  );
};
