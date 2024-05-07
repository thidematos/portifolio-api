import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RouterModal({
  path,
  isModalScrollable = false,
  children,
  hidden = false,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';

    return () => (document.body.style = '');
  }, []);

  return (
    <div
      className={`${
        hidden ? 'hidden' : ''
      } fixed w-screen h-screen z-[9990] bg-[rgba(0,0,0,0.6)] top-0 left-0 cursor-default`}
      onClick={() => {
        navigate(path);
      }}
    >
      <div
        className={`modal relative bg-gray-100 z-[9991] centerDivAbsolute animateToMiddle ${
          isModalScrollable
            ? 'w-[100%] fixed h-[90svh] overflow-y-scroll  rounded-xl overflow-x-hidden lg:w-[85%] lg:h-[90svh]'
            : 'rounded-xl w-[90%] md:w-[60%] lg:w-[40%] md:max-w-[600px] lg:max-w-[500px] 3xl:max-w-[560px] h-[75%] md:h-[65%] lg:h-[90%] 3xl:h-[80%]'
        }  shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <Link to={path}>
          <img
            src="/plus-close.png"
            alt=""
            className="closeBtn z-[9999] absolute opacity-75 max-w-[20px] top-[3%] md:top-[5%] right-[5%] cursor-pointer"
          ></img>
        </Link>
        {children}
      </div>
    </div>
  );
}

export default RouterModal;
