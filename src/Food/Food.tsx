import './Food.css';

const Food = () => {
  const pixelGrid = Array.from(Array(5).keys());

  return (
    <div class="food">
      {pixelGrid.map((x) => (
        <>
          {pixelGrid.map((y) => (
            <div class="food-pixel"></div>
          ))}
        </>
      ))}
    </div>
  );
};

export default Food;
