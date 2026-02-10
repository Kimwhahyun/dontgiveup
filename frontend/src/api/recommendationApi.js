import api from './axiosInstance';

export const recommendationApi = {
  getAll: () => api.get('/recommendations'),
  getToday: () => api.get('/recommendations/today'),
  accept: (id) => api.post(`/recommendations/${id}/accept`),
  reject: (id) => api.post(`/recommendations/${id}/reject`),
  feedback: (id, data) => api.post(`/recommendations/${id}/feedback`, data),
};
