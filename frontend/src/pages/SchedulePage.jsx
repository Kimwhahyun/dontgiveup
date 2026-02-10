import { useState, useEffect } from 'react';
import { scheduleApi } from '../api/scheduleApi';
import Timeline from '../components/schedule/Timeline';
import EveningSummary from '../components/schedule/EveningSummary';

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await scheduleApi.getToday();
        if (data.data) setSchedules(data.data);
      } catch {
        // 서버 미연결시 기본 데이터 사용
      }
    };
    fetchData();
  }, []);

  const completedCount = schedules.filter((s) => s.isCompleted).length || 5;

  return (
    <div style={{ padding: '0 20px 20px' }}>
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: '#5a4a6a',
          padding: '16px 0 4px',
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        오늘의 일정 📋
      </div>
      <div
        style={{
          fontSize: 12,
          color: '#b8a5c8',
          fontWeight: 600,
          marginBottom: 16,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        AI가 정리한 하루 타임라인
      </div>

      <Timeline schedules={schedules} />
      <EveningSummary completedCount={completedCount} />
    </div>
  );
};

export default SchedulePage;
