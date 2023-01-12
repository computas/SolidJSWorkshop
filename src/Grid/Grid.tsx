import { Show } from 'solid-js';
import Food from '../Food/Food';
import GameConfig from '../game-config';
import { FoodType } from '../types/food-type';
import { SnakeBodyPart } from '../types/snake-body-part';

import './Grid.css';
import Cell from './Cell';

type Props = {
  food: FoodType;
  snake: SnakeBodyPart[];
};

export default (props: Props) => {
  const size = Array.from(Array(GameConfig.size).keys());

  return (
    <div
      class="grid"
      style={{
        'grid-template-columns': `repeat(${GameConfig.size}, minmax(0, 1fr))`,
        'grid-template-rows': `repeat(${GameConfig.size}, minmax(0, 1fr))`,
      }}
    >
      {size.map((y) => (
        <>
          {size.map((x) => (
            <Cell x={x} y={y} snake={props.snake} food={props.food}></Cell>
          ))}
        </>
      ))}
    </div>
  );
};
