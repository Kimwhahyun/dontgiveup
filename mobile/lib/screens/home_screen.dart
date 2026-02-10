import 'package:flutter/material.dart';
import '../utils/theme.dart';
import '../utils/helpers.dart';
import '../widgets/common.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(formatDate(), style: const TextStyle(fontSize: 13, color: AppColors.textMuted, fontWeight: FontWeight.w600)),
                    const SizedBox(height: 2),
                    Text(getGreeting(), style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
                  ],
                ),
                Container(
                  width: 44, height: 44,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(16),
                    gradient: const LinearGradient(colors: [Color(0xFFFFD1DC), AppColors.pastelPink]),
                    boxShadow: [BoxShadow(color: AppColors.pastelPink.withValues(alpha: 0.4), blurRadius: 12, offset: const Offset(0, 3))],
                  ),
                  child: const Center(child: Text('🐰', style: TextStyle(fontSize: 24))),
                ),
              ],
            ),
          ),

          // AI Briefing
          _buildAiBriefing(),
          const SizedBox(height: 20),

          // Time Recommendations
          _buildSectionTitle('🕐', '시간대별 추천'),
          const SizedBox(height: 12),
          _buildTimeRecommendations(),
          const SizedBox(height: 20),

          // Quick Actions
          _buildSectionTitle('⚡', '빠른 실행'),
          const SizedBox(height: 12),
          _buildQuickActions(),
        ],
      ),
    );
  }

  Widget _buildAiBriefing() {
    return AppCard(
      gradient: const LinearGradient(colors: [Color(0xFFFFF0F5), Color(0xFFF0F0FF), Color(0xFFF0FFF0)]),
      border: Border.all(color: AppColors.pastelPink.withValues(alpha: 0.3), width: 1.5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 32, height: 32,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  gradient: const LinearGradient(colors: [AppColors.accentPink, AppColors.accentPurple]),
                ),
                child: const Center(child: Text('✨', style: TextStyle(fontSize: 16))),
              ),
              const SizedBox(width: 8),
              const Text('오늘의 AI 브리핑', style: TextStyle(fontWeight: FontWeight.w800, color: AppColors.textDark, fontSize: 14)),
              const SizedBox(width: 6),
              const AppBadge(text: 'NEW', color: Color(0xFFE8F5E9), textColor: Color(0xFF4CAF50)),
            ],
          ),
          const SizedBox(height: 12),
          RichText(
            text: const TextSpan(
              style: TextStyle(fontSize: 13.5, color: AppColors.textDark, height: 1.7, fontFamily: 'Nunito', fontWeight: FontWeight.w500),
              children: [
                TextSpan(text: '오후 3시부터 비 예보가 있어요 🌧️\n'),
                TextSpan(text: '우산 꼭 챙기세요! ', style: TextStyle(color: AppColors.danger, fontWeight: FontWeight.w700)),
                TextSpan(text: '오전 회의 장소까지 약 30분 소요, '),
                TextSpan(text: '8시 10분 출발', style: TextStyle(color: AppColors.accent, fontWeight: FontWeight.w700)),
                TextSpan(text: '을 추천해요.'),
              ],
            ),
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              _infoChip('🌡️', '12°C', '체감 9°'),
              const SizedBox(width: 8),
              _infoChip('💧', '70%', '습도'),
              const SizedBox(width: 8),
              _infoChip('🚌', '30분', '통근시간'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _infoChip(String icon, String value, String label) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.7),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: Colors.white.withValues(alpha: 0.8)),
        ),
        child: Column(
          children: [
            Text(icon, style: const TextStyle(fontSize: 18)),
            Text(value, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
            Text(label, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: AppColors.textMuted)),
          ],
        ),
      ),
    );
  }

  Widget _buildTimeRecommendations() {
    final currentPeriod = getTimeOfDay();
    final items = [
      _TimeItem('오전 9-12시', '💪', '집중 업무 시간', '중요한 업무를 오전에 처리하세요', const Color(0xFFFFF3E0), const Color(0xFFFFE0B2), 'morning'),
      _TimeItem('오후 12-1시', '🍱', '점심 추천', '근처 맛집을 찾아보세요', const Color(0xFFF3E5F5), const Color(0xFFE1BEE7), 'lunch'),
      _TimeItem('오후 6시~', '🏃', '가벼운 운동', '하루를 마무리하는 산책 추천!', const Color(0xFFE8F5E9), const Color(0xFFC8E6C9), 'evening'),
    ];

    return Column(
      children: items.map((item) {
        final isActive = item.period == currentPeriod;
        return Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: AppCard(
            backgroundColor: isActive ? item.color : Colors.white.withValues(alpha: 0.6),
            border: Border.all(color: isActive ? item.border : Colors.white.withValues(alpha: 0.5), width: isActive ? 1.5 : 1),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            child: Row(
              children: [
                Container(
                  width: 44, height: 44,
                  decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.8), borderRadius: BorderRadius.circular(14)),
                  child: Center(child: Text(item.emoji, style: const TextStyle(fontSize: 22))),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Opacity(
                    opacity: isActive ? 1.0 : 0.75,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(item.title, style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
                            if (isActive) ...[const SizedBox(width: 6), const AppBadge(text: '지금', color: Color(0xFFFFCDD2), textColor: Color(0xFFC62828))],
                          ],
                        ),
                        const SizedBox(height: 2),
                        Text(item.time, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFFA090B0))),
                        const SizedBox(height: 3),
                        Text(item.desc, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: AppColors.secondary)),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildQuickActions() {
    final actions = [
      _QAction('🧭', '근처 탐색', const LinearGradient(colors: [Color(0xFFE3F2FD), Color(0xFFBBDEFB)])),
      _QAction('📝', '일정 추가', const LinearGradient(colors: [Color(0xFFFFF3E0), Color(0xFFFFE0B2)])),
      _QAction('🎯', '집중 모드', const LinearGradient(colors: [Color(0xFFF3E5F5), Color(0xFFE1BEE7)])),
      _QAction('📊', '하루 리포트', const LinearGradient(colors: [Color(0xFFE8F5E9), Color(0xFFC8E6C9)])),
    ];

    return GridView.count(
      crossAxisCount: 2,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisSpacing: 10,
      mainAxisSpacing: 10,
      childAspectRatio: 1.5,
      children: actions
          .map((a) => AppCard(
                gradient: a.gradient,
                padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 12),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(a.emoji, style: const TextStyle(fontSize: 28)),
                    const SizedBox(height: 6),
                    Text(a.label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.textPrimary)),
                  ],
                ),
              ))
          .toList(),
    );
  }

  Widget _buildSectionTitle(String icon, String title) {
    return Row(
      children: [
        Text(icon, style: const TextStyle(fontSize: 15)),
        const SizedBox(width: 6),
        Text(title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
      ],
    );
  }
}

class _TimeItem {
  final String time, emoji, title, desc, period;
  final Color color, border;
  _TimeItem(this.time, this.emoji, this.title, this.desc, this.color, this.border, this.period);
}

class _QAction {
  final String emoji, label;
  final LinearGradient gradient;
  _QAction(this.emoji, this.label, this.gradient);
}
