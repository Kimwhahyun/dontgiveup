import { useState } from 'react';
import Toggle from '../common/Toggle';

const defaultSettings = [
  { label: '날씨 표시', key: 'weather', defaultOn: true },
  { label: '다음 일정', key: 'schedule', defaultOn: true },
  { label: 'AI 추천', key: 'ai', defaultOn: true },
  { label: '교통 정보', key: 'transport', defaultOn: false },
];

const WidgetSettings = () => {
  const [settings, setSettings] = useState(
    Object.fromEntries(defaultSettings.map((s) => [s.key, s.defaultOn]))
  );

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          color: '#5a4a6a',
          marginBottom: 10,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        🎨 위젯 커스터마이징
      </div>
      {defaultSettings.map((s, i) => (
        <div
          key={s.key}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: i < defaultSettings.length - 1 ? '1px solid rgba(200,185,215,0.15)' : 'none',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: '#6a5a7a', fontFamily: "'Nunito', sans-serif" }}>
            {s.label}
          </span>
          <Toggle isOn={settings[s.key]} onToggle={() => handleToggle(s.key)} />
        </div>
      ))}
    </div>
  );
};

export default WidgetSettings;
