import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '', general: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username || form.username.length < 2) newErrors.username = '2자 이상 입력해주세요';
    if (!form.email || !form.email.includes('@')) newErrors.email = '올바른 이메일을 입력해주세요';
    if (!form.password || form.password.length < 8) newErrors.password = '8자 이상 입력해주세요';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = '비밀번호가 일치하지 않아요';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      navigate('/');
    } catch (err) {
      setErrors({ general: err.response?.data?.message || '회원가입에 실패했어요' });
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
        새로운 하루를 시작하세요
      </div>

      <Card style={{ padding: 24, textAlign: 'left' }}>
        <form onSubmit={handleSubmit}>
          <Input
            label="아이디"
            placeholder="아이디를 입력하세요 (2자 이상)"
            value={form.username}
            onChange={handleChange('username')}
            error={errors.username}
          />
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            value={form.email}
            onChange={handleChange('email')}
            error={errors.email}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요 (8자 이상)"
            value={form.password}
            onChange={handleChange('password')}
            error={errors.password}
          />
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={errors.confirmPassword}
          />

          {errors.general && (
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
              {errors.general}
            </div>
          )}

          <Button type="submit" fullWidth disabled={loading} style={{ marginTop: 4 }}>
            {loading ? '가입 중...' : '회원가입'}
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
          이미 계정이 있으신가요?{' '}
          <Link to="/login" style={{ color: '#7B68EE', fontWeight: 700 }}>
            로그인
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
