const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  style = {},
  ...props
}) => (
  <div style={{ marginBottom: 16, ...style }}>
    {label && (
      <label
        style={{
          display: 'block',
          fontSize: 13,
          fontWeight: 700,
          color: '#6a5a7a',
          marginBottom: 6,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '12px 16px',
        borderRadius: 14,
        border: error ? '1.5px solid #FF6B6B' : '1.5px solid rgba(200,185,215,0.3)',
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(10px)',
        fontSize: 14,
        fontWeight: 500,
        color: '#5a4a6a',
        fontFamily: "'Nunito', sans-serif",
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxSizing: 'border-box',
      }}
      onFocus={(e) => {
        e.target.style.borderColor = '#C4A1FF';
        e.target.style.boxShadow = '0 0 0 3px rgba(196,161,255,0.15)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = error ? '#FF6B6B' : 'rgba(200,185,215,0.3)';
        e.target.style.boxShadow = 'none';
      }}
      {...props}
    />
    {error && (
      <span
        style={{
          display: 'block',
          fontSize: 11,
          color: '#FF6B6B',
          fontWeight: 600,
          marginTop: 4,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        {error}
      </span>
    )}
  </div>
);

export default Input;
