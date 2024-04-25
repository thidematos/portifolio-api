import { useNavigate } from 'react-router-dom';

function Button({
  type = 'action',
  onAction,
  children,
  margin,
  fontSize,
  path = -1,
  bgColor = 'bg-blue-500',
  textColor = 'text-gray-50',
  padding = 'px-6 py-3',
  width,
}) {
  const navigate = useNavigate();

  if (!onAction) onAction = navigate;
  //type === 'action' || 'back'

  function handleAction(e) {
    if (type === 'action') return onAction(e);

    if (type === 'back') return onAction(path);
  }

  return (
    <button
      className={`${width} font-poppins ${fontSize} ${padding} ${textColor} ${bgColor} rounded-md shadow-lg drop-shadow-sm ${margin}`}
      onClick={handleAction}
    >
      {children}
    </button>
  );
}

export default Button;
