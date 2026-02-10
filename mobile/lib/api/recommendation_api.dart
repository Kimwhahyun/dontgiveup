import 'api_client.dart';

class RecommendationApi {
  static Future<Map<String, dynamic>> getAll() => ApiClient.get('/recommendations');
  static Future<Map<String, dynamic>> getToday() => ApiClient.get('/recommendations/today');
  static Future<Map<String, dynamic>> accept(int id) => ApiClient.post('/recommendations/$id/accept');
  static Future<Map<String, dynamic>> reject(int id) => ApiClient.post('/recommendations/$id/reject');
  static Future<Map<String, dynamic>> feedback(int id, String text) =>
      ApiClient.post('/recommendations/$id/feedback', body: {'feedback': text});
}
