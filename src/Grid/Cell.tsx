import { Show } from 'solid-js';
import BodyPart from '../BodyPart/BodyPart';
import Food from '../Food/Food';
import { getHead } from '../helpers/get-body-part';
import { FoodType } from '../types/food-type';
import { SnakeBodyPart } from '../types/snake-body-part';

type CellProps = {
  x: number;
  y: number;
  food: FoodType;
  snake: SnakeBodyPart[];
};

const Cell = (props: CellProps) => {
  function isHead() {
    return getHead(props.snake) === getPart();
  }

  function isFood() {
    return props.food.x === props.x && props.food.y === props.y;
  }

  function getPart() {
    return props.snake.find((part) => part.x === props.x && part.y === props.y);
  }

  return (
    <div>
      <Show when={getPart()}>
        <BodyPart isHead={isHead()} bodyPart={getPart()} />
      </Show>

      <Show when={isFood()}>
        <Food />
      </Show>
    </div>
  );
};

export default Cell;
