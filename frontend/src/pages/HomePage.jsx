import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { recommendationApi } from '../api/recommendationApi';
import AiBriefingCard from '../components/home/AiBriefingCard';
import TimeRecommendations from '../components/home/TimeRecommendations';
import QuickActions from '../components/home/QuickActions';
import { getGreeting, formatDate } from '../utils/helpers';

const HomePage = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await recommendationApi.getToday();
        if (data.data) setRecommendations(data.data);
      } catch {
        // 서버 미연결시 기본 데이터 사용
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '0 20px 20px' }}>
      {/* Header */}
      <div style={{ padding: '16px 0 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 13, color: '#b8a5c8', fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
            {formatDate()}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#5a4a6a',
              fontFamily: "'Nunito', sans-serif",
              marginTop: 2,
            }}
          >
            {getGreeting()}
          </div>
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 16,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 3px 12px rgba(255,182,193,0.4)',
            fontSize: 24,
          }}
        >
          🐰
        </div>
      </div>

      <AiBriefingCard recommendations={recommendations} />
      <TimeRecommendations recommendations={recommendations.slice(0, 3)} />
      <QuickActions />
    </div>
  );
};

export default HomePage;
