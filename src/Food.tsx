import { Component } from 'solid-js';
import { FoodType } from './Board';

type Props = {
  pos: FoodType;
};

const Food: Component<Props> = (props) => {
  return (
    <div
      style={{
        display: 'grid',
        'place-content': 'center',
        width: '40px',
        height: '40px',
        position: 'absolute',
        top: `${props.pos.y * 40}px`,
        left: `${props.pos.x * 40}px`,
      }}
    >
      <img
        style={{
          width: '100%',
          height: '100%',
          'object-fit': 'cover',
        }}
        src="https://d1hr6nb56yyl1.cloudfront.net/product-images/70660-560.jpg"
      />
      {/*     <div
        style={{
          width: '10px',
          height: '10px',
          'border-radius': '50%',
          'background-color': 'red',
        }}
      ></div> */}
    </div>
  );
};

export default Food;
