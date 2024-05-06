import { useState } from 'react';
import Modal from '../Utils/Modal';
import ProjectRequestForm from './ProjectRequestForm';
import AboutMe from './AboutMe';

function NavBar({ isMobile }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleProjectRequest() {
    setIsOpenModal(true);
  }

  return (
    <div className="w-screen flex flex-row justify-center items-center bg-[rgba(250,250,250,0.7)] z-[9996] fixed top-0 backdrop-blur-[2px]">
      <nav className="flex flex-row justify-between w-[90%] lg:w-[75%] xl:w-[65%] 3xl:w-[60%] py-4 md:py-6 border-b items-baseline NavBar ">
        <Brand />
        {isMobile || <SectionList />}
        <ProjectRequest onProjectRequest={handleProjectRequest}>
          Solicitar atendimento {'>'}
        </ProjectRequest>
        <Modal isOpenModal={isOpenModal} onOpenModal={setIsOpenModal}>
          <ProjectRequestForm />
        </Modal>
      </nav>
    </div>
  );
}

function Brand() {
  return (
    <h1 className="w-[50%] md:w-[25%] md:text-center font-roboto md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl text-gray-800 tracking-tighter  drop-shadow-sm">
      Thiago L. Matos
    </h1>
  );
}

function SectionList() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleProjectRequest() {
    setIsOpenModal(true);
  }

  return (
    <ul className="flex flex-row justify-around md:w-[50%] lg:w-[50%] 2xl:w-[55%] 3xl:w-[50%]">
      <Section>
        <a href="#projetos">PROJETOS</a>
      </Section>
      <Section>
        <a href="#relatos">RELATOS</a>
      </Section>
      <Section>
        <a href="#beneficios">BENEFÍCIOS</a>
      </Section>
      <Section>
        <a href="#processo">PROCESSO</a>
      </Section>
      <Section>
        <button onClick={handleProjectRequest}>SOBRE</button>
      </Section>
      <Modal isOpenModal={isOpenModal} onOpenModal={setIsOpenModal}>
        <AboutMe />
      </Modal>
    </ul>
  );
}

function Section({ children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className={`font-poppins tracking-wide text-gray-600 drop-shadow-sm md:text-xs lg:text-sm 3xl:text-base duration-200 underline-offset-4 ${
        isHovered ? 'scale-110 underline' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {children}
    </li>
  );
}

function ProjectRequest({ children, onProjectRequest }) {
  return (
    <button
      className="w-[50%] md:w-[25%] flex flex-row justify-end md:justify-center items-center font-poppins tracking-tight text text-blue-500 drop-shadow-sm hover:underline underline-offset-[6px] text-xs lg:text-sm 3xl:text-base"
      onClick={onProjectRequest}
    >
      {children}
    </button>
  );
}

export { NavBar, ProjectRequest };
