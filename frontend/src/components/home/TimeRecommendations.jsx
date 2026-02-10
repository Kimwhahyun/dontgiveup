import Card from '../common/Card';
import Badge from '../common/Badge';
import { getTimeOfDay } from '../../utils/helpers';

const defaultItems = [
  {
    time: '오전 9-12시',
    emoji: '💪',
    title: '집중 업무 시간',
    desc: '중요한 업무를 오전에 처리하세요',
    color: '#FFF3E0',
    border: '#FFE0B2',
    period: 'morning',
  },
  {
    time: '오후 12-1시',
    emoji: '🍱',
    title: '점심 추천',
    desc: '근처 맛집을 찾아보세요',
    color: '#F3E5F5',
    border: '#E1BEE7',
    period: 'lunch',
  },
  {
    time: '오후 6시~',
    emoji: '🏃',
    title: '가벼운 운동',
    desc: '하루를 마무리하는 산책 추천!',
    color: '#E8F5E9',
    border: '#C8E6C9',
    period: 'evening',
  },
];

const TimeRecommendations = ({ recommendations = [] }) => {
  const currentPeriod = getTimeOfDay();
  const items = recommendations.length > 0
    ? recommendations.map((rec) => ({
        time: rec.recommendationTime,
        emoji: '✨',
        title: rec.title,
        desc: rec.content,
        color: '#FFF3E0',
        border: '#FFE0B2',
        period: '',
      }))
    : defaultItems;

  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          color: '#5a4a6a',
          marginBottom: 12,
          fontFamily: "'Nunito', sans-serif",
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span>🕐</span> 시간대별 추천
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => {
          const isActive = recommendations.length > 0 ? i === 0 : item.period === currentPeriod;
          return (
            <Card
              key={i}
              style={{
                background: isActive ? item.color : 'rgba(255,255,255,0.6)',
                border: isActive ? `1.5px solid ${item.border}` : '1px solid rgba(255,255,255,0.5)',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                transform: isActive ? 'scale(1.01)' : 'scale(1)',
                opacity: isActive ? 1 : 0.75,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0,
                  boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                {item.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 800, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>
                    {item.title}
                  </span>
                  {isActive && <Badge text="지금" color="#FFCDD2" textColor="#C62828" />}
                </div>
                <div style={{ fontSize: 11, color: '#a090b0', fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
                  {item.time}
                </div>
                <div style={{ fontSize: 12, color: '#7a6b8a', fontWeight: 500, marginTop: 3, fontFamily: "'Nunito', sans-serif" }}>
                  {item.desc}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TimeRecommendations;
