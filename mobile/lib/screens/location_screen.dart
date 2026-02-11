import 'package:flutter/material.dart';
import '../utils/theme.dart';
import '../widgets/common.dart';

class LocationScreen extends StatelessWidget {
  const LocationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.only(top: 16, bottom: 4),
            child: Text('위치 컨텍스트 📍', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
          ),
          const Text('장소에 맞는 맞춤 정보를 드려요', style: TextStyle(fontSize: 12, color: AppColors.textMuted, fontWeight: FontWeight.w600)),
          const SizedBox(height: 16),
          _buildCurrentLocation(),
          const SizedBox(height: 16),
          _buildContextActions(),
          const SizedBox(height: 18),
          _buildSavedPlaces(),
        ],
      ),
    );
  }

  Widget _buildCurrentLocation() {
    return AppCard(
      gradient: const LinearGradient(colors: [Color(0xFFE8F5E9), Color(0xFFF1F8E9)]),
      border: Border.all(color: const Color(0xFF81C784).withValues(alpha: 0.2), width: 1.5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.success,
                  boxShadow: [BoxShadow(color: AppColors.success.withValues(alpha: 0.5), blurRadius: 6)],
                ),
              ),
              const SizedBox(width: 8),
              const Text('현재 위치', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.success)),
            ],
          ),
          const SizedBox(height: 10),
          const Text('🏢 멀티캠퍼스 역삼', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
          const SizedBox(height: 3),
          const Text('서울특별시 강남구 역삼동 · 도착 08:45', style: TextStyle(fontSize: 11.5, color: AppColors.textSecondary, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }

  Widget _buildContextActions() {
    final items = [
      ('📋', '오늘 할 일', '팀 회의 참석, UI 작업, 알고리즘 스터디', const Color(0xFFFFF8E1), '업무'),
      ('☕', '근처 카페', '스타벅스 역삼역점 (도보 3분) · 자리 여유', const Color(0xFFFFF0F5), '추천'),
      ('🍽️', '점심 맛집', '맛나분식 (도보 5분) · 비빔밥 추천', const Color(0xFFF3E5F5), '맛집'),
      ('⏱️', '집중 타이머', '포모도로 25분 · 생산성 모드 시작', const Color(0xFFE3F2FD), '생산성'),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('✨ 회사 도착 모드 활성화', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
        const SizedBox(height: 10),
        ...items.map((item) {
          final (emoji, title, desc, bg, tag) = item;
          return Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: AppCard(
              backgroundColor: bg,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              child: Row(
                children: [
                  Container(
                    width: 42,
                    height: 42,
                    decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.7), borderRadius: BorderRadius.circular(13)),
                    child: Center(child: Text(emoji, style: const TextStyle(fontSize: 24))),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
                            const SizedBox(width: 6),
                            AppBadge(text: tag),
                          ],
                        ),
                        const SizedBox(height: 2),
                        Text(desc, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary, fontWeight: FontWeight.w500)),
                      ],
                    ),
                  ),
                  const Text('›', style: TextStyle(fontSize: 16, color: AppColors.textMuted)),
                ],
              ),
            ),
          );
        }),
      ],
    );
  }

  Widget _buildSavedPlaces() {
    final places = [
      ('🏠', '우리 집', '12km', false),
      ('🏢', '멀티캠퍼스', '여기', true),
      ('☕', '단골 카페', '0.5km', false),
      ('🏋️', '헬스장', '1.2km', false),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('💾 저장된 장소', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
        const SizedBox(height: 10),
        SizedBox(
          height: 110,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: places.length,
            separatorBuilder: (_, __) => const SizedBox(width: 10),
            itemBuilder: (_, i) {
              final (emoji, name, dist, active) = places[i];
              return AppCard(
                backgroundColor: active ? null : Colors.white.withValues(alpha: 0.65),
                gradient: active ? const LinearGradient(colors: [Color(0xFFE8F5E9), Color(0xFFC8E6C9)]) : null,
                border: Border.all(
                  color: active ? const Color(0xFF81C784).withValues(alpha: 0.3) : Colors.white.withValues(alpha: 0.5),
                  width: active ? 1.5 : 1,
                ),
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                child: SizedBox(
                  width: 56,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(emoji, style: const TextStyle(fontSize: 26)),
                      const SizedBox(height: 4),
                      Text(name, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: AppColors.textPrimary), textAlign: TextAlign.center),
                      const SizedBox(height: 2),
                      Text(dist, style: const TextStyle(fontSize: 10, color: AppColors.textMuted, fontWeight: FontWeight.w600)),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
