import { useState, useEffect } from 'react';
import { locationApi } from '../api/locationApi';
import CurrentLocation from '../components/location/CurrentLocation';
import ContextActions from '../components/location/ContextActions';
import SavedPlaces from '../components/location/SavedPlaces';

const LocationPage = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await locationApi.getAll();
        if (data.data) setLocations(data.data);
      } catch {
        // 서버 미연결시 기본 데이터 사용
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '0 20px 20px' }}>
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: '#5a4a6a',
          padding: '16px 0 4px',
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        위치 컨텍스트 📍
      </div>
      <div
        style={{
          fontSize: 12,
          color: '#b8a5c8',
          fontWeight: 600,
          marginBottom: 16,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        장소에 맞는 맞춤 정보를 드려요
      </div>

      <CurrentLocation />
      <ContextActions />
      <SavedPlaces locations={locations} />
    </div>
  );
};

export default LocationPage;
