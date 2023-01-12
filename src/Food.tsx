import { Component } from 'solid-js';
import { FoodType } from './types/food-type';

const Food = () => {
  return (
    <div>
      <img
        style={{
          width: '100%',
          height: '100%',
          'object-fit': 'cover',
        }}
        src="https://d1hr6nb56yyl1.cloudfront.net/product-images/70660-560.jpg"
      />
    </div>
  );
};

export default Food;
