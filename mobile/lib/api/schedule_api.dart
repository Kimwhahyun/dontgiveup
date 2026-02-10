import 'api_client.dart';

class ScheduleApi {
  static Future<Map<String, dynamic>> getAll() => ApiClient.get('/schedules');
  static Future<Map<String, dynamic>> getToday() => ApiClient.get('/schedules/today');
  static Future<Map<String, dynamic>> getById(int id) => ApiClient.get('/schedules/$id');
  static Future<Map<String, dynamic>> create(Map<String, dynamic> data) => ApiClient.post('/schedules', body: data);
  static Future<Map<String, dynamic>> update(int id, Map<String, dynamic> data) => ApiClient.put('/schedules/$id', body: data);
  static Future<Map<String, dynamic>> delete(int id) => ApiClient.delete('/schedules/$id');
}
