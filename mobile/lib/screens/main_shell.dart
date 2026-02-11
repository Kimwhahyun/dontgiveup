import 'package:flutter/material.dart';
import '../utils/theme.dart';
import '../widgets/common.dart';
import 'home_screen.dart';
import 'weather_screen.dart';
import 'schedule_screen.dart';
import 'location_screen.dart';
import 'profile_screen.dart';

class MainShell extends StatefulWidget {
  const MainShell({super.key});

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int _currentIndex = 0;

  final _screens = const [
    HomeScreen(),
    WeatherScreen(),
    ScheduleScreen(),
    LocationScreen(),
    ProfileScreen(),
  ];

  final _navItems = const [
    _NavItem('🏠', '홈'),
    _NavItem('🌤', '날씨'),
    _NavItem('📋', '일정'),
    _NavItem('📍', '위치'),
    _NavItem('⚙️', '설정'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: AppTheme.backgroundGradient,
        child: SafeArea(
          child: Stack(
            children: [
              const FloatingBubbles(),
              _screens[_currentIndex],
            ],
          ),
        ),
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.85),
          border: Border(top: BorderSide(color: AppColors.textMuted.withValues(alpha: 0.15))),
        ),
        padding: const EdgeInsets.only(top: 8, bottom: 24),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: _navItems.asMap().entries.map((entry) {
            final i = entry.key;
            final item = entry.value;
            final isActive = i == _currentIndex;
            return GestureDetector(
              onTap: () => setState(() => _currentIndex = i),
              behavior: HitTestBehavior.opaque,
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                transform: Matrix4.translationValues(0, isActive ? -2 : 0, 0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    AnimatedDefaultTextStyle(
                      duration: const Duration(milliseconds: 200),
                      style: TextStyle(
                        fontSize: 22,
                        color: isActive ? Colors.black : Colors.grey,
                      ),
                      child: Text(item.icon),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      item.label,
                      style: TextStyle(
                        fontSize: 9,
                        fontWeight: isActive ? FontWeight.w800 : FontWeight.w600,
                        color: isActive ? AppColors.accent : AppColors.textMuted,
                      ),
                    ),
                    if (isActive)
                      Container(
                        width: 4,
                        height: 4,
                        margin: const EdgeInsets.only(top: 2),
                        decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: LinearGradient(colors: [AppColors.accentPink, AppColors.accent]),
                        ),
                      ),
                  ],
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }
}

class _NavItem {
  final String icon;
  final String label;
  const _NavItem(this.icon, this.label);
}
