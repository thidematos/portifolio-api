import { ProjectRequest } from './NavBar';
import ProjectRequestForm from './ProjectRequestForm';
import Modal from './Modal';
import { useState } from 'react';

function Hero({ isMobile }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleProjectRequest() {
    setIsOpenModal(true);
  }

  return (
    <section className="w-full flex flex-col justify-evenly items-center md:h-auto lg:h-screen gap-10 md:gap-12 lg:gap-6 3xl:gap-12 pb-20 pt-[7rem] lg:pt-[7.5rem] xl:pt-[9rem] 3xl:pt-[11rem]">
      <div className="w-full flex flex-col justify-center items-center gap-6 md:gap-8 lg:gap-6 3xl:gap-12">
        <ImpactText />
        <SubImpact isMobile={isMobile} />
        {isMobile && <Logos />}
        <ProjectRequest onProjectRequest={handleProjectRequest}>
          <span className="text-lg md:text-lg lg:text-base xl:text-lg 3xl:text-xl drop-shadow-sm ">
            Comece um projeto {'>'}
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
    <div className="flex flex-col justify-center items-center font-roboto text-[3.5rem] md:text-[5rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[5.5rem] 3xl:text-[7rem] tracking-tighter">
      <h2 className="impact-text-title text-slate-950 leading-none">
        Excelência em
      </h2>
      <h3 className="impact-text-subtitle leading-none">Aplicativos Web</h3>
    </div>
  );
}

function SubImpact({ isMobile }) {
  return (
    <div className="w-[70%] md:w-full font-poppins text-sm md:text-base lg:text-sm xl:text-base 3xl:text-lg text-gray-700 tracking-tight text-center drop-shadow-sm mb-8">
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
  return <img src="./mern.png" alt="" className="drop-shadow w-[70%]"></img>;
}

function TrustedBy() {
  const trustedLogos = [
    'fiap.png',
    'hapvida.png',
    'logoHeinz.png',
    'palo-alto.png',
    'coliseu.png',
  ];

  return (
    <div className="flex flex-col items-center justify-center w-[50%] 2xl:my-6 3xl:my-12">
      <h4 className="font-roboto tracking-wider text-sm md:text-xs xl:text-sm 3xl:text-base text-gray-700 ">
        RECONHECIMENTOS
      </h4>

      <div className="scroller">
        <ul className="scroller__inner items-center">
          <Logo src={'fiap.png'} />
          <Logo src={'hapvida.png'} />
          <Logo src={'logoHeinz.png'} />
          <Logo src={'palo-alto.png'} />
          <Logo src={'coliseu.png'} />
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
      className="2xl:h-fit lg:max-h-[90px] xl:max-h-none lg:w-[60%] xl:w-[80%]"
      alt="logos"
    ></img>
  );
}

export default Hero;
