import { Link } from "react-router-dom";

function Logo({ path = "/", width = "w-[50%]" }) {
  return (
    <Link className={`${width}`} to={path}>
      <img src="/logo-tlm.png" className={"w-full"} />
    </Link>
  );
}

export default Logo;
