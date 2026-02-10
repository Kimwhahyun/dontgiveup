import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../utils/theme.dart';
import '../widgets/common.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _usernameCtrl = TextEditingController();
  final _passwordCtrl = TextEditingController();
  String? _error;

  Future<void> _login() async {
    if (_usernameCtrl.text.isEmpty || _passwordCtrl.text.isEmpty) {
      setState(() => _error = '모든 항목을 입력해주세요');
      return;
    }
    try {
      await context.read<AuthProvider>().login(_usernameCtrl.text, _passwordCtrl.text);
    } catch (e) {
      setState(() => _error = e.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    final isLoading = context.watch<AuthProvider>().isLoading;

    return Scaffold(
      body: Container(
        decoration: AppTheme.backgroundGradient,
        child: SafeArea(
          child: Stack(
            children: [
              const FloatingBubbles(),
              Center(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    children: [
                      const Text('🌸', style: TextStyle(fontSize: 48)),
                      const SizedBox(height: 8),
                      const Text('DayFlow',
                          style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: AppColors.textPrimary)),
                      const SizedBox(height: 4),
                      const Text('AI가 만드는 나만의 하루',
                          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.textMuted)),
                      const SizedBox(height: 28),
                      AppCard(
                        padding: const EdgeInsets.all(24),
                        child: Column(
                          children: [
                            AppInput(label: '아이디', hint: '아이디를 입력하세요', controller: _usernameCtrl),
                            AppInput(label: '비밀번호', hint: '비밀번호를 입력하세요', obscure: true, controller: _passwordCtrl),
                            if (_error != null)
                              Padding(
                                padding: const EdgeInsets.only(bottom: 12),
                                child: Text(_error!, style: const TextStyle(fontSize: 12, color: Color(0xFFFF6B6B), fontWeight: FontWeight.w600)),
                              ),
                            AppButton(text: isLoading ? '로그인 중...' : '로그인', onPressed: _login, isLoading: isLoading, fullWidth: true),
                            const SizedBox(height: 16),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Text('아직 계정이 없으신가요? ', style: TextStyle(fontSize: 13, color: AppColors.textSecondary)),
                                GestureDetector(
                                  onTap: () => Navigator.pushReplacementNamed(context, '/register'),
                                  child: const Text('회원가입', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: AppColors.accent)),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
