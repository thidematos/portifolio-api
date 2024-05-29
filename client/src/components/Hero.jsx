import { ProjectRequest } from "./NavBar";
import ProjectRequestForm from "./ProjectRequestForm";
import Modal from "../Utils/Modal";
import { useState } from "react";

function Hero({ isMobile }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleProjectRequest() {
    setIsOpenModal(true);
  }

  return (
    <section className="flex w-full flex-col items-center justify-evenly gap-10 pb-20 pt-[7rem] md:h-auto md:gap-12 lg:h-screen lg:gap-6 lg:pt-[7.5rem] xl:pt-[9rem] 3xl:gap-12 3xl:pt-[11rem]">
      <div className="flex w-full flex-col items-center justify-center gap-6 md:gap-8 lg:gap-6 3xl:gap-12">
        <ImpactText />
        <SubImpact isMobile={isMobile} />
        {isMobile && <Logos />}
        <ProjectRequest
          width="w-[50%] md:w-[25%]"
          onProjectRequest={handleProjectRequest}
        >
          <span className="text-lg drop-shadow-sm md:text-lg lg:text-base xl:text-lg 3xl:text-xl ">
            Comece um projeto {">"}
          </span>
        </ProjectRequest>
        <Modal isOpenModal={isOpenModal} onOpenModal={setIsOpenModal}>
          <ProjectRequestForm />
        </Modal>
      </div>
      <TrustedBy />
    </section>
  );
}

function ImpactText() {
  return (
    <div className="flex flex-col items-center justify-center font-roboto text-[3.5rem] tracking-tighter md:text-[5rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[5.5rem] 3xl:text-[7rem]">
      <h2 className="impact-text-title leading-none text-slate-950">
        Excelência em
      </h2>
      <h3 className="impact-text-subtitle leading-none">Aplicativos Web</h3>
    </div>
  );
}

function SubImpact({ isMobile }) {
  return (
    <div className="mb-8 w-[70%] text-center font-poppins text-sm tracking-tight text-gray-700 drop-shadow-sm md:w-full md:text-base lg:text-sm xl:text-base 3xl:text-lg">
      <p>Apps que impulsionam seus resultados com soluções personalizadas.</p>
      {isMobile || (
        <p>
          A atenção aos detalhes que transforma a eficência de sua organização.
        </p>
      )}
    </div>
  );
}

function Logos() {
  return <img src="./mern.png" alt="" className="w-[70%] drop-shadow"></img>;
}

function TrustedBy() {
  const trustedLogos = [
    "fiap.png",
    "hapvida.png",
    "logoHeinz.png",
    "palo-alto.png",
    "coliseu.png",
  ];

  return (
    <div className="flex w-[50%] flex-col items-center justify-center 2xl:my-6 3xl:my-12">
      <h4 className="font-roboto text-sm tracking-wider text-gray-700 md:text-xs xl:text-sm 3xl:text-base ">
        RECONHECIMENTOS
      </h4>

      <div className="scroller">
        <ul className="scroller__inner items-center">
          <Logo src={"fiap.png"} />
          <Logo src={"hapvida.png"} />
          <Logo src={"logoHeinz.png"} />
          <Logo src={"palo-alto.png"} />
          <Logo src={"coliseu.png"} />
          {trustedLogos.map((logo) => (
            <Logo src={logo} key={logo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function Logo({ src }) {
  return (
    <img
      src={src}
      className="lg:max-h-[90px] lg:w-[60%] xl:max-h-none xl:w-[80%] 2xl:h-fit"
      alt="logos"
    ></img>
  );
}

export default Hero;
