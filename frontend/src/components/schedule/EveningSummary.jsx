import Card from '../common/Card';

const EveningSummary = ({ completedCount = 5 }) => (
  <Card
    style={{
      marginTop: 8,
      background: 'linear-gradient(135deg, #EDE7F6, #FCE4EC)',
      border: '1.5px solid rgba(206,147,216,0.2)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <span style={{ fontSize: 18 }}>🌙</span>
      <span style={{ fontSize: 14, fontWeight: 800, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>
        저녁 하루 리뷰
      </span>
    </div>
    <div style={{ fontSize: 12, color: '#7a6b8a', fontWeight: 500, lineHeight: 1.7, fontFamily: "'Nunito', sans-serif" }}>
      오늘 <strong style={{ color: '#7B68EE' }}>{completedCount}개 일정</strong>을 완료했어요! 🎉
      <br />
      내일은 날씨가 맑아요. 빨래하기 좋은 날이니 참고하세요 ☀️
    </div>
  </Card>
);

export default EveningSummary;
