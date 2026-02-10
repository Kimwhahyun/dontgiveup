import Card from '../common/Card';

const CurrentLocation = ({ location }) => {
  const data = location || {
    name: '멀티캠퍼스 역삼',
    address: '서울특별시 강남구 역삼동',
    arrivalTime: '08:45',
  };

  return (
    <Card
      style={{
        background: 'linear-gradient(135deg, #E8F5E9, #F1F8E9)',
        border: '1.5px solid rgba(129,199,132,0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: -15, right: -15, fontSize: 60, opacity: 0.1 }}>📍</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#4CAF50',
            boxShadow: '0 0 6px rgba(76,175,80,0.5)',
            animation: 'pulse 2s infinite',
          }}
        />
        <span style={{ fontSize: 12, fontWeight: 700, color: '#4CAF50', fontFamily: "'Nunito', sans-serif" }}>
          현재 위치
        </span>
      </div>
      <div style={{ fontSize: 17, fontWeight: 800, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>
        🏢 {data.name}
      </div>
      <div style={{ fontSize: 11.5, color: '#8a7a9a', fontWeight: 500, marginTop: 3, fontFamily: "'Nunito', sans-serif" }}>
        {data.address} · 도착 {data.arrivalTime}
      </div>
    </Card>
  );
};

export default CurrentLocation;
