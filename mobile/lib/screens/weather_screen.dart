import 'package:flutter/material.dart';
import '../utils/theme.dart';
import '../widgets/common.dart';

class WeatherScreen extends StatelessWidget {
  const WeatherScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.only(top: 16, bottom: 4),
            child: Text('날씨 & 라이프스타일 🌈', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
          ),
          const Text('날씨에 딱 맞는 하루를 보내요', style: TextStyle(fontSize: 12, color: AppColors.textMuted, fontWeight: FontWeight.w600)),
          const SizedBox(height: 16),
          _buildCurrentWeather(),
          const SizedBox(height: 18),
          _buildHourlyForecast(),
          const SizedBox(height: 20),
          const Text('🌿 날씨 맞춤 제안', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
          const SizedBox(height: 12),
          _buildSuggestions(),
        ],
      ),
    );
  }

  Widget _buildCurrentWeather() {
    return AppCard(
      gradient: const LinearGradient(colors: [Color(0xFFE3F2FD), Color(0xFFF3E5F5)]),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
      child: Column(
        children: [
          const Text('⛅', style: TextStyle(fontSize: 52)),
          const SizedBox(height: 4),
          const Text('12°C', style: TextStyle(fontSize: 36, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
          const SizedBox(height: 2),
          const Text('구름 많음 · 체감 9°C', style: TextStyle(fontSize: 13, color: AppColors.textSecondary, fontWeight: FontWeight.w600)),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _weatherDetail('💧', '70%', '습도'),
              const SizedBox(width: 16),
              _weatherDetail('🌬️', '3m/s', '바람'),
              const SizedBox(width: 16),
              _weatherDetail('😊', '좋음', '미세먼지'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _weatherDetail(String icon, String value, String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.7), borderRadius: BorderRadius.circular(14)),
      child: Column(
        children: [
          Text(icon, style: const TextStyle(fontSize: 18)),
          Text(value, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
          Text(label, style: const TextStyle(fontSize: 10, color: AppColors.textMuted, fontWeight: FontWeight.w600)),
        ],
      ),
    );
  }

  Widget _buildHourlyForecast() {
    final hours = [
      ('10시', '⛅', '12°', false), ('11시', '☁️', '13°', false), ('12시', '☁️', '14°', false),
      ('1시', '🌧️', '13°', true), ('2시', '🌧️', '12°', false), ('3시', '🌧️', '11°', false), ('4시', '⛅', '11°', false),
    ];

    return SizedBox(
      height: 90,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: hours.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (_, i) {
          final (time, icon, temp, highlight) = hours[i];
          return Container(
            width: 56,
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 12),
            decoration: BoxDecoration(
              gradient: highlight ? const LinearGradient(colors: [Color(0xFFFFE0EC), Color(0xFFFFD1DC)]) : null,
              color: highlight ? null : Colors.white.withValues(alpha: 0.65),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: highlight ? AppColors.pastelPink : Colors.white.withValues(alpha: 0.5), width: highlight ? 1.5 : 1),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(time, style: const TextStyle(fontSize: 10, color: Color(0xFFA090B0), fontWeight: FontWeight.w700)),
                Text(icon, style: const TextStyle(fontSize: 22)),
                Text(temp, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildSuggestions() {
    final items = [
      ('☂️', '우산 필수!', '오후 1시부터 비가 와요. 접이식 우산 챙기세요!', const Color(0xFFFFF0F5)),
      ('👕', '겉옷 챙기세요', '낮과 밤 기온차가 5도 이상이에요', const Color(0xFFF0F7FF)),
      ('🧺', '빨래는 내일!', '내일은 맑고 건조해서 빨래하기 딱 좋아요', const Color(0xFFF5FFF0)),
      ('🚗', '세차는 목요일에', '수~목 비 그치고 금요일까지 맑은 날씨', const Color(0xFFFFFCF0)),
    ];

    return Column(
      children: items.map((item) {
        final (emoji, title, desc, bg) = item;
        return Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: AppCard(
            backgroundColor: bg,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            child: Row(
              children: [
                Container(
                  width: 44, height: 44,
                  decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.7), borderRadius: BorderRadius.circular(14)),
                  child: Center(child: Text(emoji, style: const TextStyle(fontSize: 26))),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(title, style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.w800, color: AppColors.textPrimary)),
                      const SizedBox(height: 2),
                      Text(desc, style: const TextStyle(fontSize: 11.5, color: AppColors.textSecondary, fontWeight: FontWeight.w500)),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }
}
