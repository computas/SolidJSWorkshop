import { children, ParentProps, Show } from 'solid-js';
import Food from './Food';
import GameConfig from './game-config';
import { getHead } from './helpers/get-body-part';
import BodyPart from './Snake/BodyPart';
import { FoodType } from './types/food-type';
import { SnakeBodyPart } from './types/snake-body-part';

import './Grid.css';

type Props = {
  food: FoodType;
  snake: SnakeBodyPart[];
};

type CellProps = {
  x: number;
  y: number;
  food: FoodType;
  snake: SnakeBodyPart[];
};

const Cell = (props: CellProps) => {
  const head = getHead(props.snake);

  return (
    <div id={`${props.x} ${props.y}`} class="grid-cell">
      <Show when={props.snake.find((part) => part.x === props.x && part.y === props.y)}>
        <BodyPart
          isHead={head === props.snake.find((part) => part.x === props.x && part.y === props.y)}
          bodyPart={props.snake.find((part) => part.x === props.x && part.y === props.y)}
        />
      </Show>
      <Show when={props.food.x === props.x && props.food.y === props.y}>
        <Food />
      </Show>
    </div>
  );
};

export default (props: Props) => {
  const size = Array.from(Array(GameConfig.size).keys());

  return (
    <div class="grid" style={{ 'grid-template-columns': `'repeat(${GameConfig.size}, auto)'` }}>
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
