import WidgetPreview from '../components/profile/WidgetPreview';
import WidgetSettings from '../components/profile/WidgetSettings';
import AppSettings from '../components/profile/AppSettings';

const ProfilePage = () => (
  <div style={{ padding: '0 20px 20px' }}>
    <div
      style={{
        fontSize: 20,
        fontWeight: 800,
        color: '#5a4a6a',
        padding: '16px 0 16px',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      위젯 & 설정 ⚙️
    </div>

    <WidgetPreview />
    <WidgetSettings />
    <AppSettings />
  </div>
);

export default ProfilePage;
