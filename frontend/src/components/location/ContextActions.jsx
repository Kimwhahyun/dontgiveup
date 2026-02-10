import Card from '../common/Card';
import Badge from '../common/Badge';

const defaultActions = [
  { emoji: '📋', title: '오늘 할 일', desc: '팀 회의 참석, UI 작업, 알고리즘 스터디', bg: '#FFF8E1', tag: '업무' },
  { emoji: '☕', title: '근처 카페', desc: '스타벅스 역삼역점 (도보 3분) · 자리 여유', bg: '#FFF0F5', tag: '추천' },
  { emoji: '🍽️', title: '점심 맛집', desc: '맛나분식 (도보 5분) · 비빔밥 추천', bg: '#F3E5F5', tag: '맛집' },
  { emoji: '⏱️', title: '집중 타이머', desc: '포모도로 25분 · 생산성 모드 시작', bg: '#E3F2FD', tag: '생산성' },
];

const ContextActions = ({ actions, locationName }) => {
  const items = actions || defaultActions;

  return (
    <div style={{ marginTop: 16 }}>
      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          color: '#5a4a6a',
          marginBottom: 10,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        ✨ {locationName ? `${locationName} 모드 활성화` : '회사 도착 모드 활성화'}
      </div>
      {items.map((item, i) => (
        <Card
          key={i}
          style={{
            background: item.bg,
            marginBottom: 8,
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 24,
              width: 42,
              height: 42,
              borderRadius: 13,
              background: 'rgba(255,255,255,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {item.emoji}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>
                {item.title}
              </span>
              <Badge text={item.tag} />
            </div>
            <div style={{ fontSize: 11, color: '#8a7a9a', fontWeight: 500, marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>
              {item.desc}
            </div>
          </div>
          <div style={{ fontSize: 16, color: '#c8b8d8' }}>›</div>
        </Card>
      ))}
    </div>
  );
};

export default ContextActions;
