import 'package:intl/intl.dart';

String getGreeting() {
  final hour = DateTime.now().hour;
  if (hour < 12) return '좋은 아침이에요! ☀️';
  if (hour < 18) return '활기찬 오후예요! 🌤';
  return '편안한 저녁이에요! 🌙';
}

String formatDate([DateTime? date]) {
  final d = date ?? DateTime.now();
  const dayNames = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
  final dayName = dayNames[d.weekday - 1];
  return '${d.month}월 ${d.day}일 $dayName';
}

String formatTime(String dateString) {
  final d = DateTime.parse(dateString);
  return DateFormat('HH:mm').format(d);
}

String getLocationTypeEmoji(String type) {
  const map = {
    'HOME': '🏠',
    'WORK': '🏢',
    'CAFE': '☕',
    'GYM': '🏋️',
    'CUSTOM': '📍',
  };
  return map[type.toUpperCase()] ?? '📍';
}

String getTimeOfDay() {
  final hour = DateTime.now().hour;
  if (hour < 6) return 'dawn';
  if (hour < 12) return 'morning';
  if (hour < 14) return 'lunch';
  if (hour < 18) return 'afternoon';
  if (hour < 22) return 'evening';
  return 'night';
}
