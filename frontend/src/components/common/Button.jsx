const Button = ({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  style = {},
  ...rest
}) => {
  const baseStyle = {
    padding: '12px 24px',
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "'Nunito', sans-serif",
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #FF9ED2, #C4A1FF)',
      color: '#fff',
      boxShadow: '0 2px 8px rgba(196,161,255,0.3)',
    },
    secondary: {
      background: 'rgba(255,255,255,0.7)',
      color: '#5a4a6a',
      border: '1px solid rgba(200,185,215,0.3)',
    },
    danger: {
      background: 'linear-gradient(135deg, #FF6B6B, #EE5A24)',
      color: '#fff',
      boxShadow: '0 2px 8px rgba(255,107,107,0.3)',
    },
    ghost: {
      background: 'transparent',
      color: '#7B68EE',
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...variants[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
