import { Component, Show } from 'solid-js';
import BodyPart from '../BodyPart/BodyPart';
import { SnakeBodyPart } from '../types/snake-body-part';

type Props = {
  x: number;
  y: number;
  snake: SnakeBodyPart[];
};

const Cell: Component<Props> = (props) => {
  function containsBodyPart() {
    return props.snake.find((part) => part.x === props.x && part.y === props.y);
  }

  return (
    <div>
      <Show when={containsBodyPart()}>
        <BodyPart />
      </Show>
    </div>
  );
};

export default Cell;
