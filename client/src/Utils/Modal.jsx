import { useState } from 'react';

function Modal({ children, isOpenModal, onOpenModal, isModalProject = false }) {
  if (isOpenModal) {
    document.body.style.height = '100svh';
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style = '';
  }

  return (
    <>
      {isOpenModal && (
        <div
          className="fixed w-screen h-screen z-[9998] bg-[rgba(0,0,0,0.6)] top-0 left-0 cursor-default"
          onClick={(e) => onOpenModal(false)}
        >
          <div
            className={`modal relative bg-gray-100 z-[9999] centerDivAbsolute animateToMiddle ${
              isModalProject
                ? 'w-[100%] fixed h-[100svh] overflow-y-scroll  rounded-xl overflow-x-hidden lg:w-[85%] lg:h-[90svh]'
                : 'rounded-xl w-[90%] md:w-[60%] lg:w-[40%] md:max-w-[600px] lg:max-w-[500px] 3xl:max-w-[560px] h-[75%] md:h-[65%] lg:h-[90%] 3xl:h-[80%]'
            }  shadow-xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="plus-close.png"
              alt=""
              className="closeBtn z-[9999] absolute opacity-75 max-w-[20px] top-[6%] md:top-[5%] right-[5%] cursor-pointer"
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
