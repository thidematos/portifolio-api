import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RouterModal({
  path,
  isModalScrollable = false,
  children,
  hidden = false,
  height = "h-[75%]",
  closeTop = "top-[3%]",
}) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";

    return () => (document.body.style = "");
  }, []);

  return (
    <div
      className={`${
        hidden ? "hidden" : ""
      } fixed left-0 top-0 z-[9990] h-screen w-screen cursor-default bg-[rgba(0,0,0,0.6)]`}
      onClick={() => {
        navigate(path);
      }}
    >
      <div
        className={`modal centerDivAbsolute animateToMiddle relative z-[9991] bg-gray-100 ${
          isModalScrollable
            ? "fixed h-[90svh] w-[100%] overflow-x-hidden  overflow-y-scroll rounded-xl lg:h-[90svh] lg:w-[85%]"
            : `${height} w-[90%] rounded-xl md:h-[65%] md:w-[60%] md:max-w-[600px] lg:h-[90%] lg:w-[40%] lg:max-w-[500px] 3xl:h-[80%] 3xl:max-w-[560px]`
        }  shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <Link to={path}>
          <img
            src="/plus-close.png"
            alt=""
            className={`closeBtn absolute right-[5%] ${closeTop} z-[9999] max-w-[20px] cursor-pointer opacity-75 md:top-[5%]`}
          ></img>
        </Link>
        {children}
      </div>
    </div>
  );
}

export default RouterModal;
