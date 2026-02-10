import CurrentWeather from '../components/weather/CurrentWeather';
import HourlyForecast from '../components/weather/HourlyForecast';
import LifestyleSuggestions from '../components/weather/LifestyleSuggestions';

const WeatherPage = () => (
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
      날씨 & 라이프스타일 🌈
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
      날씨에 딱 맞는 하루를 보내요
    </div>

    <CurrentWeather />
    <HourlyForecast />
    <LifestyleSuggestions />
  </div>
);

export default WeatherPage;
