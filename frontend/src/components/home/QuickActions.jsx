import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';

const actions = [
  { emoji: '🧭', label: '근처 탐색', color: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)', path: '/location' },
  { emoji: '📝', label: '일정 추가', color: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)', path: '/schedule' },
  { emoji: '🎯', label: '집중 모드', color: 'linear-gradient(135deg, #F3E5F5, #E1BEE7)', path: null },
  { emoji: '📊', label: '하루 리포트', color: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)', path: '/profile' },
];

const QuickActions = () => {
  const navigate = useNavigate();

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
        <span>⚡</span> 빠른 실행
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {actions.map((item, i) => (
          <Card
            key={i}
            onClick={() => item.path && navigate(item.path)}
            style={{
              background: item.color,
              textAlign: 'center',
              padding: '18px 12px',
              border: '1px solid rgba(255,255,255,0.6)',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 6 }}>{item.emoji}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>
              {item.label}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
