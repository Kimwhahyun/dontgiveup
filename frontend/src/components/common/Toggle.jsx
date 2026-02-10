const Toggle = ({ isOn, onToggle }) => (
  <div
    onClick={onToggle}
    style={{
      width: 44,
      height: 24,
      borderRadius: 12,
      background: isOn ? 'linear-gradient(135deg, #FF9ED2, #C4A1FF)' : '#E0D8E8',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background 0.3s',
      boxShadow: isOn ? '0 2px 6px rgba(196,161,255,0.3)' : 'none',
      flexShrink: 0,
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 3,
        left: isOn ? 23 : 3,
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: 'white',
        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
        transition: 'left 0.3s',
      }}
    />
  </div>
);

export default Toggle;
