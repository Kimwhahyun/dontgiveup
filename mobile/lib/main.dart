import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'utils/theme.dart';
import 'screens/login_screen.dart';
import 'screens/register_screen.dart';
import 'screens/main_shell.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => AuthProvider()..checkAuth(),
      child: const DayFlowApp(),
    ),
  );
}

class DayFlowApp extends StatelessWidget {
  const DayFlowApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DayFlow',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.theme,
      home: Consumer<AuthProvider>(
        builder: (context, auth, _) {
          return auth.isAuthenticated ? const MainShell() : const LoginScreen();
        },
      ),
      routes: {
        '/login': (_) => const LoginScreen(),
        '/register': (_) => const RegisterScreen(),
        '/home': (_) => const MainShell(),
      },
    );
  }
}
