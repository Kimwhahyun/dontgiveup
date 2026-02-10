const theme = {
  colors: {
    primary: '#5a4a6a',
    secondary: '#7a6b8a',
    accent: '#7B68EE',
    accentPink: '#FF9ED2',
    accentPurple: '#C4A1FF',
    success: '#4CAF50',
    warning: '#FFB74D',
    danger: '#E8578A',

    bgGradient: 'linear-gradient(135deg, #FFF5F5, #F5F0FF, #F0F8FF)',
    cardBg: 'rgba(255,255,255,0.75)',
    cardBorder: 'rgba(255,255,255,0.6)',

    textPrimary: '#5a4a6a',
    textSecondary: '#8a7a9a',
    textMuted: '#b8a5c8',
    textDark: '#6a5a7a',

    pastelPink: '#FFB6C1',
    pastelBlue: '#BBDEFB',
    pastelPurple: '#E1BEE7',
    pastelGreen: '#C8E6C9',
    pastelOrange: '#FFE0B2',
    pastelYellow: '#FFF9C4',
  },

  fonts: {
    primary: "'Nunito', sans-serif",
  },

  shadows: {
    card: '0 2px 16px rgba(180,160,200,0.12), 0 1px 4px rgba(0,0,0,0.04)',
    soft: '0 2px 8px rgba(0,0,0,0.06)',
    glow: (color) => `0 0 8px ${color}`,
    accent: '0 2px 8px rgba(196,161,255,0.3)',
    pink: '0 3px 12px rgba(255,182,193,0.4)',
  },

  borderRadius: {
    sm: 8,
    md: 14,
    lg: 20,
    xl: 44,
    full: '50%',
  },
};

export default theme;
