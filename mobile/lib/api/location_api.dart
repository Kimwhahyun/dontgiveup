import 'api_client.dart';

class LocationApi {
  static Future<Map<String, dynamic>> getAll() => ApiClient.get('/locations');
  static Future<Map<String, dynamic>> getById(int id) => ApiClient.get('/locations/$id');
  static Future<Map<String, dynamic>> create(Map<String, dynamic> data) => ApiClient.post('/locations', body: data);
  static Future<Map<String, dynamic>> update(int id, Map<String, dynamic> data) => ApiClient.put('/locations/$id', body: data);
  static Future<Map<String, dynamic>> delete(int id) => ApiClient.delete('/locations/$id');
}
