import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('모든 항목을 입력해주세요');
      return;
    }
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || '로그인에 실패했어요');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 8 }}>🌸</div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 900,
          color: '#5a4a6a',
          fontFamily: "'Nunito', sans-serif",
          marginBottom: 4,
        }}
      >
        DayFlow
      </div>
      <div
        style={{
          fontSize: 13,
          color: '#b8a5c8',
          fontWeight: 600,
          fontFamily: "'Nunito', sans-serif",
          marginBottom: 28,
        }}
      >
        AI가 만드는 나만의 하루
      </div>

      <Card style={{ padding: 24, textAlign: 'left' }}>
        <form onSubmit={handleSubmit}>
          <Input
            label="아이디"
            placeholder="아이디를 입력하세요"
            value={form.username}
            onChange={handleChange('username')}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={form.password}
            onChange={handleChange('password')}
          />

          {error && (
            <div
              style={{
                fontSize: 12,
                color: '#FF6B6B',
                fontWeight: 600,
                textAlign: 'center',
                marginBottom: 12,
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              {error}
            </div>
          )}

          <Button type="submit" fullWidth disabled={loading} style={{ marginTop: 4 }}>
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        <div
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 13,
            color: '#8a7a9a',
            fontWeight: 600,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          아직 계정이 없으신가요?{' '}
          <Link to="/register" style={{ color: '#7B68EE', fontWeight: 700 }}>
            회원가입
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
