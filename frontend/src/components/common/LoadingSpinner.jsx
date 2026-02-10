const LoadingSpinner = ({ size = 40, message = '로딩 중...' }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      gap: 12,
    }}
  >
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '3px solid rgba(196,161,255,0.2)',
        borderTopColor: '#C4A1FF',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <span
      style={{
        fontSize: 13,
        color: '#b8a5c8',
        fontWeight: 600,
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {message}
    </span>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default LoadingSpinner;
