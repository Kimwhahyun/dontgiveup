import Card from '../common/Card';
import Badge from '../common/Badge';

const WidgetPreview = () => (
  <div style={{ marginBottom: 20 }}>
    <div
      style={{
        fontSize: 14,
        fontWeight: 800,
        color: '#5a4a6a',
        marginBottom: 10,
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      📱 홈 위젯 미리보기
    </div>

    {/* Large Widget */}
    <Card
      style={{
        background: 'linear-gradient(135deg, #FFF0F5 0%, #F0F0FF 50%, #F0FFF0 100%)',
        padding: 16,
        marginBottom: 10,
        border: '1.5px solid rgba(255,182,193,0.2)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 16 }}>🌤</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>
            12°C
          </span>
          <span style={{ fontSize: 11, color: '#b8a5c8', fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
            구름많음
          </span>
        </div>
        <Badge text="DayFlow" color="#F3E5F5" textColor="#9C27B0" />
      </div>
      <div
        style={{
          background: 'rgba(255,255,255,0.6)',
          borderRadius: 14,
          padding: '10px 14px',
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 16 }}>💼</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>
            다음 일정: 팀 회의
          </div>
          <div style={{ fontSize: 10, color: '#b8a5c8', fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
            1시간 23분 남음
          </div>
        </div>
      </div>
      <div
        style={{
          background: 'rgba(255,232,240,0.5)',
          borderRadius: 14,
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 14 }}>✨</span>
        <span style={{ fontSize: 11, color: '#8a7a9a', fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
          오후에 비 예보 ☂️ 우산 챙기세요!
        </span>
      </div>
    </Card>

    {/* Small Widgets */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      <Card style={{ background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)', textAlign: 'center', padding: 14 }}>
        <div style={{ fontSize: 24 }}>⛅</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>12°</div>
        <div style={{ fontSize: 10, color: '#7a9ab8', fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
          오후 비 예보
        </div>
      </Card>
      <Card style={{ background: 'linear-gradient(135deg, #FCE4EC, #F8BBD9)', textAlign: 'center', padding: 14 }}>
        <div style={{ fontSize: 24 }}>⏰</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>1:23</div>
        <div style={{ fontSize: 10, color: '#9a7a8a', fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
          다음 일정까지
        </div>
      </Card>
    </div>
  </div>
);

export default WidgetPreview;
