import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../common/Card';
import Button from '../common/Button';

const menuItems = [
  { emoji: '👤', label: '프로필 관리', path: null },
  { emoji: '🔔', label: '알림 설정', path: null },
  { emoji: '📍', label: '장소 관리', path: '/location' },
  { emoji: '🎨', label: '테마 변경', path: null },
  { emoji: '❓', label: '도움말 & 피드백', path: null },
];

const AppSettings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          color: '#5a4a6a',
          marginBottom: 10,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        ⚙️ 앱 설정
      </div>
      {menuItems.map((s, i) => (
        <Card
          key={i}
          onClick={() => s.path && navigate(s.path)}
          style={{
            marginBottom: 6,
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(255,255,255,0.55)',
          }}
        >
          <span style={{ fontSize: 18 }}>{s.emoji}</span>
          <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: '#6a5a7a', fontFamily: "'Nunito', sans-serif" }}>
            {s.label}
          </span>
          <span style={{ fontSize: 14, color: '#c8b8d8' }}>›</span>
        </Card>
      ))}

      <div style={{ marginTop: 20 }}>
        <Button variant="danger" fullWidth onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default AppSettings;
