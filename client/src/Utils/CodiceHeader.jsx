import { useEffect, useRef } from "react";
import Logo from "./Logo";
import Button from "./Button";
import { Link } from "react-router-dom";

function CodiceHeader({ setHeaderSize, headerSize }) {
  const headerRef = useRef(null);

  useEffect(
    () =>
      setHeaderSize(
        Math.round(headerRef.current.getBoundingClientRect().height),
      ),
    [headerSize, setHeaderSize],
  );

  return (
    <>
      <header
        ref={headerRef}
        className="fixed z-[500] flex w-full flex-row items-center justify-around border-b border-gray-500/75 bg-gray-50/75 py-6 "
      >
        <Logo width="w-[40%]" />

        <Link className="text flex flex-row items-center justify-end font-poppins text-sm tracking-tight text-blue-500 underline-offset-[6px] drop-shadow-sm hover:underline md:w-[25%] md:justify-center lg:text-sm 3xl:text-base">
          Iniciar {">"}
        </Link>
      </header>
      <div style={{ height: `${headerSize}px` }}></div>
    </>
  );
}

export default CodiceHeader;
