import Card from '../common/Card';
import Badge from '../common/Badge';

const AiBriefingCard = ({ recommendations = [] }) => {
  const latestRec = recommendations[0];

  return (
    <Card
      style={{
        marginTop: 16,
        background: 'linear-gradient(135deg, #FFF0F5 0%, #F0F0FF 50%, #F0FFF0 100%)',
        border: '1.5px solid rgba(255,182,193,0.3)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -10,
          right: -10,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255,218,185,0.2)',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #FF9ED2, #C4A1FF)',
            borderRadius: 12,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(196,161,255,0.3)',
          }}
        >
          <span style={{ fontSize: 16 }}>✨</span>
        </div>
        <span style={{ fontWeight: 800, color: '#6a5a7a', fontSize: 14, fontFamily: "'Nunito', sans-serif" }}>
          오늘의 AI 브리핑
        </span>
        <Badge text="NEW" color="#E8F5E9" textColor="#4CAF50" />
      </div>
      <div
        style={{
          fontSize: 13.5,
          color: '#6a5a7a',
          lineHeight: 1.7,
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 500,
        }}
      >
        {latestRec ? (
          <>
            {latestRec.content}
          </>
        ) : (
          <>
            오후 3시부터 비 예보가 있어요 🌧️
            <br />
            <strong style={{ color: '#E8578A' }}>우산 꼭 챙기세요!</strong> 오전 회의 장소까지 약 30분 소요,{' '}
            <strong style={{ color: '#7B68EE' }}>8시 10분 출발</strong>을 추천해요.
          </>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
        {[
          { icon: '🌡️', text: '12°C', sub: '체감 9°' },
          { icon: '💧', text: '70%', sub: '습도' },
          { icon: '🚌', text: '30분', sub: '통근시간' },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              minWidth: 80,
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 14,
              padding: '10px 12px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.8)',
            }}
          >
            <div style={{ fontSize: 18 }}>{item.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>
              {item.text}
            </div>
            <div style={{ fontSize: 10, color: '#b8a5c8', fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
              {item.sub}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AiBriefingCard;
