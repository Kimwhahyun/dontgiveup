import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import FloatingBubbles from '../common/FloatingBubbles';

const AppLayout = () => (
  <div style={{ minHeight: '100vh', position: 'relative' }}>
    <FloatingBubbles />
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 480,
        margin: '0 auto',
        paddingBottom: 80,
      }}
    >
      <Outlet />
    </div>
    <BottomNav />
  </div>
);

export default AppLayout;
