import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../api/auth_api.dart';

class AuthProvider extends ChangeNotifier {
  bool _isAuthenticated = false;
  bool _isLoading = false;
  String? _username;
  int? _userId;

  bool get isAuthenticated => _isAuthenticated;
  bool get isLoading => _isLoading;
  String? get username => _username;
  int? get userId => _userId;

  Future<void> checkAuth() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('accessToken');
    _isAuthenticated = token != null;
    _username = prefs.getString('username');
    _userId = prefs.getInt('userId');
    notifyListeners();
  }

  Future<void> login(String username, String password) async {
    _isLoading = true;
    notifyListeners();
    try {
      final result = await AuthApi.login(username: username, password: password);
      final data = result['data'];
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('accessToken', data['accessToken']);
      await prefs.setString('refreshToken', data['refreshToken']);
      await prefs.setString('username', data['username']);
      await prefs.setInt('userId', data['userId']);
      _isAuthenticated = true;
      _username = data['username'];
      _userId = data['userId'];
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> register(String username, String email, String password) async {
    _isLoading = true;
    notifyListeners();
    try {
      final result = await AuthApi.register(username: username, email: email, password: password);
      final data = result['data'];
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('accessToken', data['accessToken']);
      await prefs.setString('refreshToken', data['refreshToken']);
      await prefs.setString('username', data['username']);
      await prefs.setInt('userId', data['userId']);
      _isAuthenticated = true;
      _username = data['username'];
      _userId = data['userId'];
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> logout() async {
    try {
      await AuthApi.logout();
    } catch (_) {}
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    _isAuthenticated = false;
    _username = null;
    _userId = null;
    notifyListeners();
  }
}
