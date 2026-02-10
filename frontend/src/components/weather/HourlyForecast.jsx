const defaultHours = [
  { time: '10시', icon: '⛅', temp: '12°' },
  { time: '11시', icon: '☁️', temp: '13°' },
  { time: '12시', icon: '☁️', temp: '14°' },
  { time: '1시', icon: '🌧️', temp: '13°' },
  { time: '2시', icon: '🌧️', temp: '12°' },
  { time: '3시', icon: '🌧️', temp: '11°' },
  { time: '4시', icon: '⛅', temp: '11°' },
];

const HourlyForecast = ({ hours }) => {
  const data = hours || defaultHours;
  const highlightIdx = 3;

  return (
    <div style={{ marginTop: 18, overflowX: 'auto', display: 'flex', gap: 8, paddingBottom: 4 }}>
      {data.map((h, i) => (
        <div
          key={i}
          style={{
            flexShrink: 0,
            background: i === highlightIdx ? 'linear-gradient(135deg,#FFE0EC,#FFD1DC)' : 'rgba(255,255,255,0.65)',
            borderRadius: 16,
            padding: '12px 14px',
            textAlign: 'center',
            border: i === highlightIdx ? '1.5px solid #FFB6C1' : '1px solid rgba(255,255,255,0.5)',
            minWidth: 56,
          }}
        >
          <div style={{ fontSize: 10, color: '#a090b0', fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>
            {h.time}
          </div>
          <div style={{ fontSize: 22, margin: '6px 0' }}>{h.icon}</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>
            {h.temp}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;
