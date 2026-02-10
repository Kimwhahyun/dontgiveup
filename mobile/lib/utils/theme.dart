import 'package:flutter/material.dart';

class AppColors {
  static const primary = Color(0xFF5A4A6A);
  static const secondary = Color(0xFF7A6B8A);
  static const accent = Color(0xFF7B68EE);
  static const accentPink = Color(0xFFFF9ED2);
  static const accentPurple = Color(0xFFC4A1FF);
  static const success = Color(0xFF4CAF50);
  static const warning = Color(0xFFFFB74D);
  static const danger = Color(0xFFE8578A);

  static const textPrimary = Color(0xFF5A4A6A);
  static const textSecondary = Color(0xFF8A7A9A);
  static const textMuted = Color(0xFFB8A5C8);
  static const textDark = Color(0xFF6A5A7A);

  static const pastelPink = Color(0xFFFFB6C1);
  static const pastelBlue = Color(0xFFBBDEFB);
  static const pastelPurple = Color(0xFFE1BEE7);
  static const pastelGreen = Color(0xFFC8E6C9);
  static const pastelOrange = Color(0xFFFFE0B2);

  static const cardBg = Color(0xBFFFFFFF); // 75% opacity white
  static const bgStart = Color(0xFFFFF5F5);
  static const bgMid = Color(0xFFF5F0FF);
  static const bgEnd = Color(0xFFF0F8FF);
}

class AppTheme {
  static ThemeData get theme => ThemeData(
        fontFamily: 'Nunito',
        scaffoldBackgroundColor: Colors.transparent,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.accent,
          brightness: Brightness.light,
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.transparent,
          elevation: 0,
          titleTextStyle: TextStyle(
            fontFamily: 'Nunito',
            fontSize: 20,
            fontWeight: FontWeight.w800,
            color: AppColors.textPrimary,
          ),
        ),
      );

  static BoxDecoration get backgroundGradient => const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [AppColors.bgStart, AppColors.bgMid, AppColors.bgEnd],
        ),
      );
}
