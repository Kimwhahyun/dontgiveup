const Badge = ({ text, color = '#FFB6C1', textColor = '#8B4060' }) => (
  <span
    style={{
      background: color,
      color: textColor,
      fontSize: 10,
      fontWeight: 700,
      padding: '3px 10px',
      borderRadius: 20,
      letterSpacing: 0.3,
      fontFamily: "'Nunito', sans-serif",
    }}
  >
    {text}
  </span>
);

export default Badge;
