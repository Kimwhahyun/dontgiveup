import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import SchedulePage from './pages/SchedulePage';
import LocationPage from './pages/LocationPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const GuestRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
};

const App = () => (
  <Routes>
    {/* Auth Routes */}
    <Route
      element={
        <GuestRoute>
          <AuthLayout />
        </GuestRoute>
      }
    >
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>

    {/* Protected Routes */}
    <Route
      element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/" element={<HomePage />} />
      <Route path="/weather" element={<WeatherPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/location" element={<LocationPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
