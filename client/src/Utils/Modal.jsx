import { useEffect, useState } from "react";

function Modal({ children, isOpenModal, onOpenModal, isModalProject = false }) {
  if (isOpenModal) {
    document.body.style.height = "100svh";
    document.body.style.overflow = "hidden";
  } else {
    document.body.style = "";
  }

  return (
    <>
      {isOpenModal && (
        <div
          className="fixed left-0 top-0 z-[9998] h-screen w-screen cursor-default bg-[rgba(0,0,0,0.6)]"
          onClick={(e) => onOpenModal(false)}
        >
          <div
            className={`modal centerDivAbsolute animateToMiddle relative z-[9999] bg-gray-100 ${
              isModalProject
                ? "fixed h-[100svh] w-[100%] overflow-x-hidden  overflow-y-scroll rounded-xl lg:h-[90svh] lg:w-[85%]"
                : "h-[75%] w-[90%] rounded-xl md:h-[65%] md:w-[60%] md:max-w-[600px] lg:h-[90%] lg:w-[40%] lg:max-w-[500px] 3xl:h-[80%] 3xl:max-w-[560px]"
            }  shadow-xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="plus-close.png"
              alt=""
              className="closeBtn absolute right-[5%] top-[6%] z-[9999] max-w-[20px] cursor-pointer opacity-75 md:top-[5%]"
              onClick={() => onOpenModal(false)}
            ></img>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
