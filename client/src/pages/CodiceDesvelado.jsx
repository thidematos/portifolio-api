import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import CodiceHeader from "./../Utils/CodiceHeader";

function CodiceDesvelado() {
  const [headerSize, setHeaderSize] = useState("");

  return (
    <div className="min-h-[100svh] w-full">
      <CodiceHeader headerSize={headerSize} setHeaderSize={setHeaderSize} />
      <Hero headerSize={headerSize} />

      <Outlet />
    </div>
  );
}

function Hero({ headerSize }) {
  const heroSize = screen.availHeight - headerSize;

  return (
    <div
      style={{ height: `${heroSize}px` }}
      className="relative flex w-full flex-col items-start justify-start gap-4 font-noto"
    >
      <img
        src="/man-above-hero.jpeg"
        className="h-full w-full opacity-30 blur-sm brightness-75"
      />

      <div className="absolute top-[10%] flex w-full flex-col items-center justify-center gap-3 text-lg text-gray-500">
        <h2 className="w-[40%]   text-center  drop-shadow">TECNOLOGIA</h2>
        <h2 className="w-[40%]   text-center drop-shadow">HISTÓRIA</h2>
        <h2 className="w-[40%]   text-center  drop-shadow">COTIDIANO</h2>
      </div>
      <div className="centerDivAbsolute absolute flex w-[75%] flex-col items-start justify-center gap-4 pb-6">
        <h1 className="bg-gray-50 p-4 text-5xl text-gray-800 drop-shadow">
          Sapere
        </h1>
        <h1 className="self-end bg-gray-50 p-4 text-6xl font-bold text-gray-800 drop-shadow-xl ">
          Aude.
        </h1>
      </div>
      <div className="absolute bottom-[15%] flex w-full flex-col items-center justify-center">
        <Link
          to={"read/?category=+gophed"}
          className="rounded-lg bg-blue-500/90 p-3 font-noto text-lg tracking-wider text-gray-50 shadow-xl drop-shadow"
        >
          Conheça o Códice
        </Link>
      </div>
    </div>
  );
}

export default CodiceDesvelado;
