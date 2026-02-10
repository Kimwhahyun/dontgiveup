export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return '좋은 아침이에요! ☀️';
  if (hour < 18) return '활기찬 오후예요! 🌤';
  return '편안한 저녁이에요! 🌙';
};

export const formatDate = (date = new Date()) => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dayName = dayNames[d.getDay()];
  return `${month}월 ${day}일 ${dayName}`;
};

export const formatTime = (dateString) => {
  const d = new Date(dateString);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 6) return 'dawn';
  if (hour < 12) return 'morning';
  if (hour < 14) return 'lunch';
  if (hour < 18) return 'afternoon';
  if (hour < 22) return 'evening';
  return 'night';
};

export const getLocationTypeEmoji = (type) => {
  const map = {
    HOME: '🏠',
    WORK: '🏢',
    CAFE: '☕',
    GYM: '🏋️',
    CUSTOM: '📍',
    home: '🏠',
    work: '🏢',
    cafe: '☕',
    gym: '🏋️',
    custom: '📍',
  };
  return map[type] || '📍';
};

export const getRecommendationTypeInfo = (type) => {
  const map = {
    ACTIVITY: { emoji: '🏃', label: '활동', color: '#E8F5E9' },
    FOOD: { emoji: '🍱', label: '음식', color: '#FFF3E0' },
    TRANSPORT: { emoji: '🚌', label: '교통', color: '#E3F2FD' },
    WEATHER_ACTION: { emoji: '☂️', label: '날씨', color: '#FFF0F5' },
    PRODUCTIVITY: { emoji: '💪', label: '생산성', color: '#F3E5F5' },
    HEALTH: { emoji: '💚', label: '건강', color: '#E8F5E9' },
    activity: { emoji: '🏃', label: '활동', color: '#E8F5E9' },
    food: { emoji: '🍱', label: '음식', color: '#FFF3E0' },
    transport: { emoji: '🚌', label: '교통', color: '#E3F2FD' },
    weather_action: { emoji: '☂️', label: '날씨', color: '#FFF0F5' },
    productivity: { emoji: '💪', label: '생산성', color: '#F3E5F5' },
    health: { emoji: '💚', label: '건강', color: '#E8F5E9' },
  };
  return map[type] || { emoji: '✨', label: '추천', color: '#F3E5F5' };
};
