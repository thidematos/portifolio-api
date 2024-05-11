import { Link } from "react-router-dom";

function FloatingButton({
  path,
  icon,
  position,
  size,
  padding,
  bgColor,
  width,
}) {
  return (
    <Link
      to={path}
      className={`${position} ${size} ${padding} ${bgColor} absolute rounded-full shadow-xl`}
    >
      <img src={`/${icon}`} className={`${width} drop-shadow`} />
    </Link>
  );
}

export default FloatingButton;
