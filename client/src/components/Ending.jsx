import Modal from "../Utils/Modal";
import { useState } from "react";
import AboutMe from "./AboutMe";
import ProjectRequestForm from "./ProjectRequestForm";
import { Link } from "react-router-dom";

function Ending() {
  return (
    <section className="flex w-full flex-col items-center justify-start gap-6 pt-8 md:pt-0">
      <ImgCTA />
      <EndBox />
    </section>
  );
}

function ImgCTA() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function handleProjectRequest() {
    setIsOpenModal(true);
  }
  const toggleBrightness = (e) => {
    setIsHovered((state) => !state);
  };

  return (
    <>
      <div
        className="parent relative flex h-[250px] w-[95%] cursor-pointer flex-col items-center justify-center gap-6 md:h-[300px] md:w-[85%] lg:w-[60%] xl:h-[400px] 2xl:h-[450px] 3xl:h-[500px]"
        onMouseOver={toggleBrightness}
        onMouseOut={toggleBrightness}
      >
        <img
          src="rocket-launch.jpg"
          alt=""
          className={`img h-full w-full rounded-xl ${
            isHovered ? "brightness-50" : "brightness-[.25]"
          } centerDivAbsolute absolute z-0 cursor-pointer shadow-xl grayscale-[20%] duration-150`}
        ></img>
        <h3 className=" cta z-10  cursor-pointer text-center font-poppins text-2xl text-gray-300 md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl">
          Transforme sua marca.
        </h3>
        <button
          className={`text-center font-poppins ${
            isHovered
              ? "bg-[rgba(229,231,235,0.9)] text-blue-500"
              : "text-gray-100"
          } cta ctaBtn z-10 rounded-lg p-3 text-base drop-shadow-lg duration-300 md:text-lg lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl`}
          onClick={handleProjectRequest}
        >
          Inicie um projeto {">"}
        </button>
      </div>
      <Modal isOpenModal={isOpenModal} onOpenModal={setIsOpenModal}>
        <ProjectRequestForm />
      </Modal>
    </>
  );
}

function EndBox() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="flex w-[90%] cursor-pointer flex-row flex-wrap items-center justify-center gap-6 rounded-lg md:w-[85%] md:flex-nowrap lg:w-[60%]">
      <EndTile isLink={true}>
        <EndTileContent
          title={"Visite o Códice"}
          subtitle={"Blog diário com reflexões sobre o cotidiano."}
          img={"man-above.jpeg"}
          imgWidth={""}
        />
      </EndTile>
      <EndTile>
        <EndTileContent
          title={"Sobre Thiago"}
          subtitle={"Conheça um pouco sobre mim e minha história."}
          img={"me.png"}
          imgWidth={"w-[70%] me grayscale-[40%]"}
          onOpenModal={setIsOpenModal}
        />
      </EndTile>
      <Modal isOpenModal={isOpenModal} onOpenModal={setIsOpenModal}>
        <AboutMe />
      </Modal>
    </div>
  );
}

function EndTile({ children, isLink = false }) {
  if (isLink)
    return (
      <Link to="/codice-desvelado" className="w-full">
        {children}
      </Link>
    );

  return <>{children}</>;
}

function EndTileContent({
  title,
  subtitle,
  img,
  imgWidth,
  onOpenModal = (arg) => null,
}) {
  const [isHoveredTile, setIsHoveredTile] = useState(false);

  const toggleHover = (e) => {
    setIsHoveredTile((state) => !state);
  };
  return (
    <div
      className="flex h-[150px] w-full flex-row items-center justify-between overflow-hidden rounded-lg bg-gray-200 drop-shadow-xl md:h-[160px] lg:h-[200px] lg:max-h-[150px] xl:max-h-[180px]"
      onMouseOver={toggleHover}
      onMouseOut={toggleHover}
      onClick={() => onOpenModal(true)}
    >
      <div className="flex w-[50%] flex-col items-start justify-center gap-2 p-4 font-poppins xl:p-6 3xl:p-10">
        <h6
          className={`${
            isHoveredTile ? "text-blue-500" : "text-gray-800"
          } text-lg duration-200 lg:text-sm xl:text-lg 2xl:text-xl  3xl:text-2xl`}
        >
          {title}
        </h6>
        <p className="text-sm text-gray-500 lg:text-xs xl:text-sm 3xl:text-base">
          {" "}
          {subtitle}
        </p>
      </div>

      <div className=" flex h-full w-[50%] flex-row justify-end overflow-hidden">
        <img
          src={img}
          alt=""
          className={`${
            isHoveredTile ? "scale-125" : ""
          }   h-full rounded-r-lg duration-200 ${imgWidth} sca`}
        ></img>
      </div>
    </div>
  );
}

export default Ending;
