import './Food.css';

const transparentPixel = [
  '0 0',
  '0 1',
  '0 4',
  '0 5',
  '0 0',
  '1 0',
  '2 0',
  '3 0',
  '4 0',
  '5 0',
  '0 5',
  '1 5',
  '2 5',
  '3 5',
  '4 5',
  '5 5',

  '1 2',
  '1 3',
  '2 2',
  '2 3',
  '3 2',
  '3 3',
  '4 2',
  '4 3',

  '5 0',
  '5 1',
  '5 4',
  '5 5',
];

const Food = () => {
  const pixelGrid = Array.from(Array(6).keys());

  return (
    <div class="food">
      {pixelGrid.map((x) => (
        <>
          {pixelGrid.map((y) => (
            <div
              class="food-pixel"
              style={{ background: transparentPixel.includes(`${x} ${y}`) ? 'transparent' : '' }}
            ></div>
          ))}
        </>
      ))}
    </div>
  );
};

export default Food;
