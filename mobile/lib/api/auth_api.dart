import 'api_client.dart';

class AuthApi {
  static Future<Map<String, dynamic>> register({
    required String username,
    required String email,
    required String password,
  }) async {
    return ApiClient.post('/auth/register', body: {
      'username': username,
      'email': email,
      'password': password,
    }, auth: false);
  }

  static Future<Map<String, dynamic>> login({
    required String username,
    required String password,
  }) async {
    return ApiClient.post('/auth/login', body: {
      'username': username,
      'password': password,
    }, auth: false);
  }

  static Future<Map<String, dynamic>> logout() async {
    return ApiClient.post('/auth/logout');
  }
}
