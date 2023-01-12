import { Show } from 'solid-js';
import BodyPart from '../BodyPart/BodyPart';
import Food from '../Food/Food';
import { FoodType } from '../types/food-type';
import { SnakeBodyPart } from '../types/snake-body-part';

type CellProps = {
  x: number;
  y: number;
  food: FoodType;
  snake: SnakeBodyPart[];
};

const Cell = (props: CellProps) => {
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

export default Cell;
