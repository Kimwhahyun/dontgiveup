const bubbleConfig = [
  { size: 40, color: 'rgba(255,182,193,0.15)', left: '10%', top: '15%' },
  { size: 60, color: 'rgba(173,216,230,0.12)', left: '75%', top: '30%' },
  { size: 30, color: 'rgba(255,218,185,0.15)', left: '50%', top: '60%' },
  { size: 50, color: 'rgba(221,160,221,0.1)', left: '85%', top: '70%' },
  { size: 35, color: 'rgba(152,251,152,0.12)', left: '20%', top: '85%' },
  { size: 45, color: 'rgba(255,255,186,0.15)', left: '60%', top: '45%' },
];

const FloatingBubbles = () => (
  <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    {bubbleConfig.map((b, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          width: b.size,
          height: b.size,
          borderRadius: '50%',
          background: b.color,
          left: b.left,
          top: b.top,
          animation: `floatBubble ${3 + i * 0.5}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.3}s`,
        }}
      />
    ))}
  </div>
);

export default FloatingBubbles;
