import GameConfig from '../game-config';

const PixelOverlay = () => {
  const pixelDensity = 3;
  const pixelsPerRow = GameConfig.gridSize * pixelDensity;
  const pixelRow = Array.from(Array(pixelsPerRow).keys());

  return (
    <div
      style={{
        'grid-template-columns': `repeat(${pixelsPerRow}, minmax(0, 1fr))`,
        'grid-template-rows': `repeat(${pixelsPerRow}, minmax(0, 1fr))`,
      }}
    >
      {pixelRow.map(() => (
        <>
          {pixelRow.map(() => (
            <div class="pixel-cell"></div>
          ))}
        </>
      ))}
    </div>
  );
};

export default PixelOverlay;
