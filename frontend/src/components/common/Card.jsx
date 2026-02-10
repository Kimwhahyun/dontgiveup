const Card = ({ children, style = {}, onClick, className = '' }) => (
  <div
    onClick={onClick}
    className={className}
    style={{
      background: 'rgba(255,255,255,0.75)',
      backdropFilter: 'blur(10px)',
      borderRadius: 20,
      padding: 16,
      boxShadow: '0 2px 16px rgba(180,160,200,0.12), 0 1px 4px rgba(0,0,0,0.04)',
      border: '1px solid rgba(255,255,255,0.6)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform 0.2s, box-shadow 0.2s',
      ...style,
    }}
  >
    {children}
  </div>
);

export default Card;
