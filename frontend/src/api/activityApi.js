import api from './axiosInstance';

export const activityApi = {
  getAll: () => api.get('/activities'),
  create: (data) => api.post('/activities', data),
  getStats: () => api.get('/activities/stats'),
};
