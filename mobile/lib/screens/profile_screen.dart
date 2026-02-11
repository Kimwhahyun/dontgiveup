import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../utils/theme.dart';
import '../widgets/common.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final Map<String, bool> _widgetSettings = {
    '날씨 표시': true,
    '다음 일정': true,
    'AI 추천': true,
    '교통 정보': false,
  };

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.only(top: 16, bottom: 16),
            child: Text('위젯 & 설정 ⚙️', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
          ),
          _buildWidgetPreview(),
          const SizedBox(height: 20),
          _buildWidgetSettings(),
          const SizedBox(height: 18),
          _buildAppSettings(),
        ],
      ),
    );
  }

  Widget _buildWidgetPreview() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('📱 홈 위젯 미리보기', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
        const SizedBox(height: 10),
        // Large widget
        AppCard(
          gradient: const LinearGradient(colors: [Color(0xFFFFF0F5), Color(0xFFF0F0FF), Color(0xFFF0FFF0)]),
          border: Border.all(color: AppColors.pastelPink.withValues(alpha: 0.2), width: 1.5),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Row(
                    children: [
                      Text('🌤', style: TextStyle(fontSize: 16)),
                      SizedBox(width: 6),
                      Text('12°C', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
                      SizedBox(width: 6),
                      Text('구름많음', style: TextStyle(fontSize: 11, color: AppColors.textMuted, fontWeight: FontWeight.w600)),
                    ],
                  ),
                  AppBadge(text: 'DayFlow', color: const Color(0xFFF3E5F5), textColor: Colors.purple.shade700),
                ],
              ),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.6), borderRadius: BorderRadius.circular(14)),
                child: const Row(
                  children: [
                    Text('💼', style: TextStyle(fontSize: 16)),
                    SizedBox(width: 10),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('다음 일정: 팀 회의', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.textPrimary)),
                        Text('1시간 23분 남음', style: TextStyle(fontSize: 10, color: AppColors.textMuted, fontWeight: FontWeight.w600)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(color: const Color(0xFFFFE8F0).withValues(alpha: 0.5), borderRadius: BorderRadius.circular(14)),
                child: const Row(
                  children: [
                    Text('✨', style: TextStyle(fontSize: 14)),
                    SizedBox(width: 8),
                    Text('오후에 비 예보 ☂️ 우산 챙기세요!', style: TextStyle(fontSize: 11, color: AppColors.textSecondary, fontWeight: FontWeight.w600)),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 10),
        // Small widgets
        Row(
          children: [
            Expanded(
              child: AppCard(
                gradient: const LinearGradient(colors: [Color(0xFFE3F2FD), Color(0xFFBBDEFB)]),
                padding: const EdgeInsets.all(14),
                child: const Column(
                  children: [
                    Text('⛅', style: TextStyle(fontSize: 24)),
                    Text('12°', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
                    Text('오후 비 예보', style: TextStyle(fontSize: 10, color: Color(0xFF7A9AB8), fontWeight: FontWeight.w600)),
                  ],
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: AppCard(
                gradient: const LinearGradient(colors: [Color(0xFFFCE4EC), Color(0xFFF8BBD9)]),
                padding: const EdgeInsets.all(14),
                child: const Column(
                  children: [
                    Text('⏰', style: TextStyle(fontSize: 24)),
                    Text('1:23', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
                    Text('다음 일정까지', style: TextStyle(fontSize: 10, color: Color(0xFF9A7A8A), fontWeight: FontWeight.w600)),
                  ],
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildWidgetSettings() {
    final keys = _widgetSettings.keys.toList();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('🎨 위젯 커스터마이징', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
        const SizedBox(height: 10),
        ...keys.asMap().entries.map((entry) {
          final i = entry.key;
          final label = entry.value;
          final isOn = _widgetSettings[label]!;
          return Container(
            padding: const EdgeInsets.symmetric(vertical: 12),
            decoration: BoxDecoration(
              border: i < keys.length - 1
                  ? Border(bottom: BorderSide(color: AppColors.textMuted.withValues(alpha: 0.15)))
                  : null,
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(label, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.textDark)),
                GestureDetector(
                  onTap: () => setState(() => _widgetSettings[label] = !isOn),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    width: 44,
                    height: 24,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(12),
                      gradient: isOn ? const LinearGradient(colors: [AppColors.accentPink, AppColors.accentPurple]) : null,
                      color: isOn ? null : const Color(0xFFE0D8E8),
                      boxShadow: isOn ? [BoxShadow(color: AppColors.accentPurple.withValues(alpha: 0.3), blurRadius: 6, offset: const Offset(0, 2))] : null,
                    ),
                    child: AnimatedAlign(
                      duration: const Duration(milliseconds: 300),
                      alignment: isOn ? Alignment.centerRight : Alignment.centerLeft,
                      child: Container(
                        width: 18,
                        height: 18,
                        margin: const EdgeInsets.symmetric(horizontal: 3),
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: Colors.white,
                          boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.15), blurRadius: 4, offset: const Offset(0, 1))],
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        }),
      ],
    );
  }

  Widget _buildAppSettings() {
    final items = [
      ('👤', '프로필 관리'),
      ('🔔', '알림 설정'),
      ('📍', '장소 관리'),
      ('🎨', '테마 변경'),
      ('❓', '도움말 & 피드백'),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('⚙️ 앱 설정', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
        const SizedBox(height: 10),
        ...items.map((item) {
          final (emoji, label) = item;
          return Padding(
            padding: const EdgeInsets.only(bottom: 6),
            child: AppCard(
              backgroundColor: Colors.white.withValues(alpha: 0.55),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              child: Row(
                children: [
                  Text(emoji, style: const TextStyle(fontSize: 18)),
                  const SizedBox(width: 12),
                  Expanded(child: Text(label, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.textDark))),
                  const Text('›', style: TextStyle(fontSize: 14, color: AppColors.textMuted)),
                ],
              ),
            ),
          );
        }),
        const SizedBox(height: 20),
        AppButton(
          text: '로그아웃',
          isDanger: true,
          fullWidth: true,
          onPressed: () async {
            await context.read<AuthProvider>().logout();
          },
        ),
      ],
    );
  }
}
