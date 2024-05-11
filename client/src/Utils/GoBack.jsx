import { Link } from "react-router-dom";

function GoBack({ position, width = "w-[10%]", path }) {
  return (
    <Link
      to={path}
      className={`rounded-full bg-gray-200 ${position} absolute ${width} `}
    >
      <img src="/back-button.png" />
    </Link>
  );
}

export default GoBack;
