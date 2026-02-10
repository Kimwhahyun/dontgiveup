import Card from '../common/Card';
import { getLocationTypeEmoji } from '../../utils/helpers';

const defaultPlaces = [
  { emoji: '🏠', name: '우리 집', dist: '12km', active: false },
  { emoji: '🏢', name: '멀티캠퍼스', dist: '여기', active: true },
  { emoji: '☕', name: '단골 카페', dist: '0.5km', active: false },
  { emoji: '🏋️', name: '헬스장', dist: '1.2km', active: false },
];

const SavedPlaces = ({ locations = [] }) => {
  const places = locations.length > 0
    ? locations.map((loc) => ({
        emoji: getLocationTypeEmoji(loc.locationType),
        name: loc.locationName,
        dist: '',
        active: false,
      }))
    : defaultPlaces;

  return (
    <div style={{ marginTop: 18 }}>
      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          color: '#5a4a6a',
          marginBottom: 10,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        💾 저장된 장소
      </div>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
        {places.map((p, i) => (
          <Card
            key={i}
            style={{
              flexShrink: 0,
              textAlign: 'center',
              padding: '14px 16px',
              minWidth: 88,
              background: p.active ? 'linear-gradient(135deg,#E8F5E9,#C8E6C9)' : 'rgba(255,255,255,0.65)',
              border: p.active ? '1.5px solid rgba(129,199,132,0.3)' : '1px solid rgba(255,255,255,0.5)',
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 4 }}>{p.emoji}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#5a4a6a', fontFamily: "'Nunito', sans-serif" }}>
              {p.name}
            </div>
            <div style={{ fontSize: 10, color: '#b8a5c8', fontWeight: 600, marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>
              {p.dist}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedPlaces;
