import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatTime } from '../../utils/helpers';

const defaultSchedules = [
  { time: '08:10', title: '🚌 출발 시간', desc: '회의 장소까지 30분 · 지하철 2호선', color: '#FFF3E0', dot: '#FFB74D', active: false },
  { time: '09:00', title: '💼 팀 회의', desc: '3층 회의실 · 프로젝트 진행 상황 공유', color: '#E8EAF6', dot: '#7986CB', active: true },
  { time: '10:30', title: '💻 개발 작업', desc: 'UI 작업 · 집중 모드 ON', color: '#FCE4EC', dot: '#F48FB1', active: false },
  { time: '12:00', title: '🍱 점심시간', desc: 'AI 추천: 근처 맛집', color: '#F3E5F5', dot: '#CE93D8', active: false },
  { time: '14:00', title: '📚 스터디', desc: '알고리즘 복습 · 문제풀이', color: '#E0F7FA', dot: '#4DD0E1', active: false },
  { time: '18:00', title: '🏠 퇴근', desc: '지하철 혼잡도: 보통', color: '#E8F5E9', dot: '#81C784', active: false },
];

const dotColors = ['#FFB74D', '#7986CB', '#F48FB1', '#CE93D8', '#4DD0E1', '#81C784', '#FFB74D'];
const bgColors = ['#FFF3E0', '#E8EAF6', '#FCE4EC', '#F3E5F5', '#E0F7FA', '#E8F5E9', '#FFF3E0'];

const Timeline = ({ schedules = [] }) => {
  const now = new Date();

  const items = schedules.length > 0
    ? schedules.map((s, i) => {
        const start = new Date(s.startTime);
        const end = new Date(s.endTime);
        const isActive = now >= start && now <= end;
        return {
          time: formatTime(s.startTime),
          title: s.title,
          desc: s.description || s.customLocation || '',
          color: bgColors[i % bgColors.length],
          dot: dotColors[i % dotColors.length],
          active: isActive,
        };
      })
    : defaultSchedules;

  return (
    <div style={{ position: 'relative', paddingLeft: 28 }}>
      <div
        style={{
          position: 'absolute',
          left: 9,
          top: 8,
          bottom: 8,
          width: 2,
          background: 'linear-gradient(to bottom, #FFB6C1, #C4A1FF, #87CEEB)',
          borderRadius: 2,
        }}
      />
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            position: 'relative',
            marginBottom: 12,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: -24,
              top: 14,
              width: item.active ? 14 : 10,
              height: item.active ? 14 : 10,
              borderRadius: '50%',
              background: item.dot,
              border: item.active ? '3px solid white' : '2px solid white',
              boxShadow: item.active ? `0 0 8px ${item.dot}` : '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.3s',
            }}
          />
          <Card
            style={{
              flex: 1,
              background: item.active ? item.color : 'rgba(255,255,255,0.6)',
              border: item.active ? '1.5px solid rgba(121,134,203,0.3)' : '1px solid rgba(255,255,255,0.5)',
              padding: '12px 14px',
              opacity: item.active ? 1 : 0.8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>
                {item.title}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {item.active && <Badge text="진행중" color="#C5CAE9" textColor="#3949AB" />}
                <span style={{ fontSize: 11, color: '#b8a5c8', fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>
                  {item.time}
                </span>
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: '#8a7a9a', fontWeight: 500, marginTop: 4, fontFamily: "'Nunito', sans-serif" }}>
              {item.desc}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
