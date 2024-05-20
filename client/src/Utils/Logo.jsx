import { Link } from "react-router-dom";

function Logo({ path = "/", width = "w-[50%]", clickable = true }) {
  return (
    <Link className={`${width}`} to={clickable ? path : null}>
      <img src="/logo-tlm.png" className={"w-full"} />
    </Link>
  );
}

export default Logo;
