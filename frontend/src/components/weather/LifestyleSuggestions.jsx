import Card from '../common/Card';

const defaultSuggestions = [
  { emoji: '☂️', title: '우산 필수!', desc: '오후 1시부터 비가 와요. 접이식 우산 챙기세요!', bg: '#FFF0F5' },
  { emoji: '👕', title: '겉옷 챙기세요', desc: '낮과 밤 기온차가 5도 이상이에요', bg: '#F0F7FF' },
  { emoji: '🧺', title: '빨래는 내일!', desc: '내일은 맑고 건조해서 빨래하기 딱 좋아요', bg: '#F5FFF0' },
  { emoji: '🚗', title: '세차는 목요일에', desc: '수~목 비 그치고 금요일까지 맑은 날씨', bg: '#FFFCF0' },
];

const LifestyleSuggestions = ({ suggestions }) => {
  const items = suggestions || defaultSuggestions;

  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          color: '#5a4a6a',
          marginBottom: 12,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        🌿 날씨 맞춤 제안
      </div>
      {items.map((s, i) => (
        <Card
          key={i}
          style={{
            background: s.bg,
            marginBottom: 8,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              fontSize: 26,
              width: 44,
              height: 44,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {s.emoji}
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>
              {s.title}
            </div>
            <div style={{ fontSize: 11.5, color: '#8a7a9a', fontWeight: 500, marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>
              {s.desc}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default LifestyleSuggestions;
