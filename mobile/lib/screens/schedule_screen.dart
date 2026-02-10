import 'package:flutter/material.dart';
import '../utils/theme.dart';
import '../widgets/common.dart';

class ScheduleScreen extends StatelessWidget {
  const ScheduleScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.only(top: 16, bottom: 4),
            child: Text('오늘의 일정 📋', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
          ),
          const Text('AI가 정리한 하루 타임라인', style: TextStyle(fontSize: 12, color: AppColors.textMuted, fontWeight: FontWeight.w600)),
          const SizedBox(height: 16),
          _buildTimeline(),
          const SizedBox(height: 8),
          _buildEveningSummary(),
        ],
      ),
    );
  }

  Widget _buildTimeline() {
    final items = [
      _ScheduleItem('08:10', '🚌 출발 시간', '회의 장소까지 30분 · 지하철 2호선', const Color(0xFFFFF3E0), const Color(0xFFFFB74D), false),
      _ScheduleItem('09:00', '💼 팀 회의', '3층 회의실 · 프로젝트 진행 상황 공유', const Color(0xFFE8EAF6), const Color(0xFF7986CB), true),
      _ScheduleItem('10:30', '💻 개발 작업', 'UI 작업 · 집중 모드 ON', const Color(0xFFFCE4EC), const Color(0xFFF48FB1), false),
      _ScheduleItem('12:00', '🍱 점심시간', 'AI 추천: 근처 맛집', const Color(0xFFF3E5F5), const Color(0xFFCE93D8), false),
      _ScheduleItem('14:00', '📚 스터디', '알고리즘 복습 · 문제풀이', const Color(0xFFE0F7FA), const Color(0xFF4DD0E1), false),
      _ScheduleItem('18:00', '🏠 퇴근', '지하철 혼잡도: 보통', const Color(0xFFE8F5E9), const Color(0xFF81C784), false),
    ];

    return Stack(
      children: [
        Positioned(
          left: 9,
          top: 8,
          bottom: 8,
          child: Container(
            width: 2,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(2),
              gradient: const LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [AppColors.pastelPink, AppColors.accentPurple, Color(0xFF87CEEB)],
              ),
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(left: 28),
          child: Column(
            children: items.asMap().entries.map((entry) {
              final item = entry.value;
              return Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Stack(
                  clipBehavior: Clip.none,
                  children: [
                    Positioned(
                      left: -33,
                      top: 14,
                      child: Container(
                        width: item.active ? 14 : 10,
                        height: item.active ? 14 : 10,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: item.dot,
                          border: Border.all(color: Colors.white, width: item.active ? 3 : 2),
                          boxShadow: [
                            if (item.active) BoxShadow(color: item.dot.withValues(alpha: 0.5), blurRadius: 8),
                            if (!item.active) BoxShadow(color: Colors.black.withValues(alpha: 0.1), blurRadius: 3),
                          ],
                        ),
                      ),
                    ),
                    AppCard(
                      backgroundColor: item.active ? item.color : Colors.white.withValues(alpha: 0.6),
                      border: Border.all(
                        color: item.active ? const Color(0xFF7986CB).withValues(alpha: 0.3) : Colors.white.withValues(alpha: 0.5),
                        width: item.active ? 1.5 : 1,
                      ),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                      child: Opacity(
                        opacity: item.active ? 1.0 : 0.8,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(item.title, style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
                                Row(
                                  children: [
                                    if (item.active) ...[
                                      const AppBadge(text: '진행중', color: Color(0xFFC5CAE9), textColor: Color(0xFF3949AB)),
                                      const SizedBox(width: 4),
                                    ],
                                    Text(item.time, style: const TextStyle(fontSize: 11, color: AppColors.textMuted, fontWeight: FontWeight.w700)),
                                  ],
                                ),
                              ],
                            ),
                            const SizedBox(height: 4),
                            Text(item.desc, style: const TextStyle(fontSize: 11.5, color: AppColors.textSecondary, fontWeight: FontWeight.w500)),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              );
            }).toList(),
          ),
        ),
      ],
    );
  }

  Widget _buildEveningSummary() {
    return AppCard(
      gradient: const LinearGradient(colors: [Color(0xFFEDE7F6), Color(0xFFFCE4EC)]),
      border: Border.all(color: const Color(0xFFCE93D8).withValues(alpha: 0.2), width: 1.5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Text('🌙', style: TextStyle(fontSize: 18)),
              SizedBox(width: 8),
              Text('저녁 하루 리뷰', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
            ],
          ),
          const SizedBox(height: 8),
          RichText(
            text: const TextSpan(
              style: TextStyle(fontSize: 12, color: AppColors.secondary, fontWeight: FontWeight.w500, height: 1.7, fontFamily: 'Nunito'),
              children: [
                TextSpan(text: '오늘 '),
                TextSpan(text: '5개 일정', style: TextStyle(color: AppColors.accent, fontWeight: FontWeight.w700)),
                TextSpan(text: '을 완료했어요! 🎉\n내일은 날씨가 맑아요. 빨래하기 좋은 날이니 참고하세요 ☀️'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ScheduleItem {
  final String time, title, desc;
  final Color color, dot;
  final bool active;
  _ScheduleItem(this.time, this.title, this.desc, this.color, this.dot, this.active);
}
