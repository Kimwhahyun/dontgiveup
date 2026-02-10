import { Outlet } from 'react-router-dom';
import FloatingBubbles from '../common/FloatingBubbles';

const AuthLayout = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: 20,
    }}
  >
    <FloatingBubbles />
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: 400,
      }}
    >
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;
