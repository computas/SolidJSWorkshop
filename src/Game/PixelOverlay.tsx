import GameConfig from '../game-config';

const PixelOverlay = () => {
  const pixelDensity = 3;
  const pixelsPerRow = GameConfig.gridSize * pixelDensity;
  const pixelRow = Array.from(Array(pixelsPerRow).keys());

  return (
    <div
      style={{
        position: 'absolute',
        'pointer-events': 'none',
        gap: '1px',
        background:
          'radial-gradient(circle, rgba(48,48,48,1) 0%, rgba(255,255,255,1) 20%, rgba(119,119,119,1) 44%, rgba(164,164,164,1) 77%, rgba(255,255,255,1) 100%)',
        display: 'grid',
        height: '100%',
        width: '100%',
        opacity: '0.03',
        'grid-template-columns': `repeat(${pixelsPerRow}, minmax(0, 1fr))`,
        'grid-template-rows': `repeat(${pixelsPerRow}, minmax(0, 1fr))`,
      }}
    >
      {pixelRow.map(() => (
        <>
          {pixelRow.map(() => (
            <div style={{ height: '100%', width: '100%', border: '1px solid black' }}></div>
          ))}
        </>
      ))}
    </div>
  );
};

export default PixelOverlay;
