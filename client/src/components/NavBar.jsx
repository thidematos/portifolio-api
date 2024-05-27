import { useState } from "react";
import Modal from "../Utils/Modal";
import ProjectRequestForm from "./ProjectRequestForm";
import AboutMe from "./AboutMe";
import Logo from "../Utils/Logo";

function NavBar({ isMobile }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleProjectRequest() {
    setIsOpenModal(true);
  }

  return (
    <div className="fixed top-0 z-[9996] flex w-screen flex-row items-center justify-center bg-[rgba(250,250,250,0.7)] backdrop-blur-[2px]">
      <nav className="NavBar flex w-[90%] flex-row items-center justify-between border-b py-6 lg:w-[75%] xl:w-[65%] 3xl:w-[60%] ">
        <Logo width="w-[40%] md:w-[20%]" clickable={true} path="/" />
        {isMobile || <SectionList />}
        <ProjectRequest onProjectRequest={handleProjectRequest}>
          Solicitar atendimento {">"}
        </ProjectRequest>
        <Modal isOpenModal={isOpenModal} onOpenModal={setIsOpenModal}>
          <ProjectRequestForm />
        </Modal>
      </nav>
    </div>
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
      className={`font-poppins tracking-wide text-gray-600 underline-offset-4 drop-shadow-sm duration-200 md:text-xs lg:text-sm 3xl:text-base ${
        isHovered ? "scale-110 underline" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {children}
    </li>
  );
}

function ProjectRequest({
  children,
  onProjectRequest,
  width = "w-[50%] md:w-[20%]",
}) {
  return (
    <button
      className={`${width} flex w-[50%] flex-row items-center justify-end font-poppins text-xs tracking-tight text-blue-500 underline-offset-[6px] drop-shadow-sm hover:underline  md:justify-center lg:text-sm 3xl:text-base`}
      onClick={onProjectRequest}
    >
      {children}
    </button>
  );
}

export { NavBar, ProjectRequest };
