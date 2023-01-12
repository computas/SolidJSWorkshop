import { Component, createSignal, For, Index } from 'solid-js';
import { SnakeBodyPart } from '../Board';
import BodyPart from '../Snake/BodyPart';

import './Body.css';

type Props = {
  bodyParts: SnakeBodyPart[];
};

const Body: Component<Props> = (props) => {
  return (
    <ul class="snakeBody">
      <Index each={props.bodyParts}>
        {(bodyPart, i) => (
          <li>
            <BodyPart
              isHead={i === props.bodyParts.length - 1}
              bodyPart={bodyPart()}
            />
          </li>
        )}
      </Index>
    </ul>
  );
};

export default Body;
