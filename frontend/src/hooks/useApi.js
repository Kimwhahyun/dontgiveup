import { useState, useEffect, useCallback } from 'react';

export const useApi = (apiFunc, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...args);
      const result = response.data?.data ?? response.data;
      setData(result);
      return result;
    } catch (err) {
      const message = err.response?.data?.message || err.message || '오류가 발생했어요';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return { data, loading, error, execute, setData };
};
