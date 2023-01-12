import { Component, Show } from 'solid-js';
import { SnakeBodyPart } from '../types/snake-body-part';

import './BodyPart.css';

type Props = {
  bodyPart: SnakeBodyPart;
  isHead: boolean;
};

const BodyPart: Component<Props> = (props) => {
  return (
    <div
      classList={{
        part: true,
        left: props.bodyPart.direction === 'left',
        right: props.bodyPart.direction === 'right',
        up: props.bodyPart.direction === 'up',
        down: props.bodyPart.direction === 'down',
      }}
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
      }}
    >
      <Show
        when={props.isHead}
        fallback={<img src="https://d1hr6nb56yyl1.cloudfront.net/product-images/70660-560.jpg" />}
      >
        <img src="https://site.uit.no/acqva/wp-content/uploads/sites/262/2022/08/BildeMK.jpg" />
      </Show>
    </div>
  );
};

export default BodyPart;
