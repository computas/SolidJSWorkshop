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
        left: props.bodyPart.x * 40 + 'px',
        top: props.bodyPart.y * 40 + 'px',
      }}
    >
      <Show
        when={props.isHead}
        fallback={
          <img
            style={{
              width: '100%',
              height: '100%',
              'object-fit': 'cover',
            }}
            src="https://d1hr6nb56yyl1.cloudfront.net/product-images/70660-560.jpg"
          />
        }
      >
        <img
          style={{
            width: '100%',
            height: '100%',
            'object-fit': 'cover',
          }}
          src="https://site.uit.no/acqva/wp-content/uploads/sites/262/2022/08/BildeMK.jpg"
        />
        {/*         <span class="eye"></span>
        <span class="eye"></span> */}
      </Show>
    </div>
  );
};

export default BodyPart;
