import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/', icon: '🏠', label: '홈' },
  { path: '/weather', icon: '🌤', label: '날씨' },
  { path: '/schedule', icon: '📋', label: '일정' },
  { path: '/location', icon: '📍', label: '위치' },
  { path: '/profile', icon: '⚙️', label: '설정' },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(200,185,215,0.15)',
        padding: '8px 12px 24px',
        display: 'flex',
        justifyContent: 'space-around',
        zIndex: 50,
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: 12,
              transition: 'all 0.2s',
              transform: isActive ? 'translateY(-2px)' : 'none',
            }}
          >
            <div
              style={{
                fontSize: 22,
                filter: isActive ? 'none' : 'grayscale(0.5)',
                opacity: isActive ? 1 : 0.5,
                transition: 'all 0.2s',
              }}
            >
              {item.icon}
            </div>
            <span
              style={{
                fontSize: 9,
                fontWeight: isActive ? 800 : 600,
                color: isActive ? '#7B68EE' : '#b8a5c8',
                fontFamily: "'Nunito', sans-serif",
                transition: 'all 0.2s',
              }}
            >
              {item.label}
            </span>
            {isActive && (
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF9ED2, #7B68EE)',
                  marginTop: -1,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BottomNav;
