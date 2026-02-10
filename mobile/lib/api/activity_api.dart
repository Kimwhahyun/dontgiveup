import 'api_client.dart';

class ActivityApi {
  static Future<Map<String, dynamic>> getAll() => ApiClient.get('/activities');
  static Future<Map<String, dynamic>> create(Map<String, dynamic> data) => ApiClient.post('/activities', body: data);
  static Future<Map<String, dynamic>> getStats() => ApiClient.get('/activities/stats');
}
