import { useEffect, useState } from 'react';

const times = {
  toFadeInAfter: 50,
  toFadeOut: 300,
  toUnmount: 4000,
};

function ErrorNotification({
  error,
  setError = () => null,
  bgColor,
  fontSize,
  toUpperCase,
  textColor,
  position,
  children,
  width,
  height,
}) {
  const [opacity, setOpacity] = useState('opacity-0');

  useEffect(() => {
    setTimeout(() => {
      setOpacity('opacity-70');
    }, times.toFadeInAfter);
  }, []);

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setOpacity('opacity-0');
      setTimeout(() => {
        setError('');
      }, times.toFadeOut);
    }, times.toUnmount);
  }, [error, setError]);

  return (
    <div
      className={`font-poppins absolute py-2 px-4 text-center rounded shadow-xl ${opacity} ${bgColor} ${fontSize} ${textColor} ${position} ${width} ${height} duration-200`}
    >
      {toUpperCase ? children.toUpperCase() : children}
    </div>
  );
}

export default ErrorNotification;
