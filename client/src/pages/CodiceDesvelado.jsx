import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import CodiceHeader from "./../Utils/CodiceHeader";
import useVerifyUser from "../hooks/useVerifyUser";

function CodiceDesvelado() {
  const [headerSize, setHeaderSize] = useState("");
  const [user, setUser] = useVerifyUser();

  return (
    <div className="min-h-[100svh] w-full overflow-y-hidden md:h-[100svh] ">
      <CodiceHeader headerSize={headerSize} setHeaderSize={setHeaderSize} />
      <Hero headerSize={headerSize} />

      <Outlet context={{ setUser, path: "/codice-desvelado/read" }} />
    </div>
  );
}

function Hero({ headerSize }) {
  const heroSize = window.innerHeight - headerSize;

  return (
    <div
      style={{ height: `${heroSize}px` }}
      className="relative flex w-full flex-col items-start justify-start gap-4 font-noto lg:overflow-y-hidden"
    >
      <img
        src="/man-above-hero.jpeg"
        className="h-full w-full opacity-30 blur-sm brightness-75 lg:absolute lg:top-[-65%] lg:h-auto lg:w-full 2xl:top-[-80%] 3xl:top-[-65%]"
      />

      <div className="absolute top-[10%] flex w-full flex-col items-center justify-center gap-3 text-lg text-gray-500 md:text-xl lg:top-[5%] lg:text-sm xl:text-lg 2xl:text-sm 3xl:text-xl">
        <h2 className="w-[40%]   text-center  drop-shadow">TECNOLOGIA</h2>
        <h2 className="w-[40%]   text-center drop-shadow">HISTÓRIA</h2>
        <h2 className="w-[40%]   text-center  drop-shadow">COTIDIANO</h2>
      </div>
      <div className="centerDivAbsolute absolute flex w-[60%] flex-col items-start justify-center gap-4 pb-6 italic md:w-[50%] md:gap-10 lg:w-[30%] lg:gap-4 xl:w-[35%] 2xl:w-[20%] 3xl:w-[40%]">
        <h1 className="w-[60%] bg-gray-50 p-4 text-center text-xl text-gray-800 drop-shadow lg:w-[45%] lg:text-xl xl:text-3xl 2xl:text-xl 3xl:py-6 3xl:text-5xl">
          Códice
        </h1>
        <h1 className="w-[60%] self-end bg-gray-50 p-4 text-center text-xl font-bold text-gray-800 drop-shadow-xl lg:w-[45%] lg:text-xl xl:text-3xl 2xl:text-xl 3xl:py-6 3xl:text-5xl">
          Desvelado.
        </h1>
      </div>
      <div className="absolute bottom-[15%] flex w-full flex-col items-center justify-center 2xl:bottom-[16%]">
        <Link
          to={"read/?category=+gophed"}
          className="rounded-lg bg-blue-500/90 p-3 font-noto text-lg tracking-wider text-gray-50 shadow-xl drop-shadow md:p-6 md:text-2xl lg:p-4 lg:text-base xl:text-lg 2xl:text-base 3xl:text-2xl"
        >
          Conheça o Códice
        </Link>
      </div>
    </div>
  );
}

export default CodiceDesvelado;
