import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../utils/theme.dart';
import '../widgets/common.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _usernameCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  final _passwordCtrl = TextEditingController();
  final _confirmCtrl = TextEditingController();
  String? _error;

  Future<void> _register() async {
    if (_usernameCtrl.text.length < 2) {
      setState(() => _error = '아이디는 2자 이상 입력해주세요');
      return;
    }
    if (!_emailCtrl.text.contains('@')) {
      setState(() => _error = '올바른 이메일을 입력해주세요');
      return;
    }
    if (_passwordCtrl.text.length < 8) {
      setState(() => _error = '비밀번호는 8자 이상 입력해주세요');
      return;
    }
    if (_passwordCtrl.text != _confirmCtrl.text) {
      setState(() => _error = '비밀번호가 일치하지 않아요');
      return;
    }
    try {
      await context.read<AuthProvider>().register(_usernameCtrl.text, _emailCtrl.text, _passwordCtrl.text);
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
                      const Text('새로운 하루를 시작하세요',
                          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.textMuted)),
                      const SizedBox(height: 28),
                      AppCard(
                        padding: const EdgeInsets.all(24),
                        child: Column(
                          children: [
                            AppInput(label: '아이디', hint: '아이디를 입력하세요 (2자 이상)', controller: _usernameCtrl),
                            AppInput(label: '이메일', hint: '이메일을 입력하세요', controller: _emailCtrl),
                            AppInput(label: '비밀번호', hint: '비밀번호를 입력하세요 (8자 이상)', obscure: true, controller: _passwordCtrl),
                            AppInput(label: '비밀번호 확인', hint: '비밀번호를 다시 입력하세요', obscure: true, controller: _confirmCtrl),
                            if (_error != null)
                              Padding(
                                padding: const EdgeInsets.only(bottom: 12),
                                child: Text(_error!, style: const TextStyle(fontSize: 12, color: Color(0xFFFF6B6B), fontWeight: FontWeight.w600)),
                              ),
                            AppButton(text: isLoading ? '가입 중...' : '회원가입', onPressed: _register, isLoading: isLoading, fullWidth: true),
                            const SizedBox(height: 16),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Text('이미 계정이 있으신가요? ', style: TextStyle(fontSize: 13, color: AppColors.textSecondary)),
                                GestureDetector(
                                  onTap: () => Navigator.pushReplacementNamed(context, '/login'),
                                  child: const Text('로그인', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: AppColors.accent)),
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
