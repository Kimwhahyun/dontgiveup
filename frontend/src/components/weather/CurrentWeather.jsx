import Card from '../common/Card';

const CurrentWeather = ({ weather }) => {
  const data = weather || {
    icon: '⛅',
    temp: '12°C',
    desc: '구름 많음 · 체감 9°C',
    details: [
      { label: '습도', value: '70%', icon: '💧' },
      { label: '바람', value: '3m/s', icon: '🌬️' },
      { label: '미세먼지', value: '좋음', icon: '😊' },
    ],
  };

  return (
    <Card
      style={{
        background: 'linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)',
        textAlign: 'center',
        padding: '24px 16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 10, left: 20, fontSize: 60, opacity: 0.15 }}>🌤</div>
      <div style={{ fontSize: 52, marginBottom: 4 }}>{data.icon}</div>
      <div style={{ fontSize: 36, fontWeight: 800, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>
        {data.temp}
      </div>
      <div style={{ fontSize: 13, color: '#8a7a9a', fontWeight: 600, fontFamily: "'Nunito', sans-serif", marginTop: 2 }}>
        {data.desc}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
        {data.details.map((w, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 14,
              padding: '10px 14px',
              minWidth: 72,
            }}
          >
            <div style={{ fontSize: 18 }}>{w.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>
              {w.value}
            </div>
            <div style={{ fontSize: 10, color: '#b8a5c8', fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
              {w.label}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CurrentWeather;
