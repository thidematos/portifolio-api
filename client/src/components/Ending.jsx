import Modal from '../Utils/Modal';
import { useState } from 'react';
import AboutMe from './AboutMe';
import ProjectRequestForm from './ProjectRequestForm';
import { Link } from 'react-router-dom';

function Ending() {
  return (
    <section className="pt-8 md:pt-0 w-full flex flex-col justify-start items-center gap-6">
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
        className="parent w-[95%] md:w-[85%] lg:w-[60%] h-[250px] md:h-[300px] xl:h-[400px] 2xl:h-[450px] 3xl:h-[500px] relative flex flex-col justify-center items-center gap-6 cursor-pointer"
        onMouseOver={toggleBrightness}
        onMouseOut={toggleBrightness}
      >
        <img
          src="rocket-launch.jpg"
          alt=""
          className={`img w-full h-full rounded-xl ${
            isHovered ? 'brightness-50' : 'brightness-[.25]'
          } duration-150 absolute centerDivAbsolute z-0 shadow-xl cursor-pointer grayscale-[20%]`}
        ></img>
        <h3 className=" text-center font-poppins  text-gray-300 text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl cta z-10 cursor-pointer">
          Transforme sua marca.
        </h3>
        <button
          className={`text-center font-poppins ${
            isHovered
              ? 'text-blue-500 bg-[rgba(229,231,235,0.9)]'
              : 'text-gray-100'
          } text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl cta z-10 duration-300 ctaBtn p-3 rounded-lg drop-shadow-lg`}
          onClick={handleProjectRequest}
        >
          Inicie um projeto {'>'}
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
    <div className="flex flex-row justify-center flex-wrap md:flex-nowrap items-center w-[90%] md:w-[85%] lg:w-[60%] gap-6 rounded-lg cursor-pointer">
      <EndTile isLink={true}>
        <EndTileContent
          title={'Visite o Códice'}
          subtitle={'Blog diário com reflexões sobre o cotidiano.'}
          img={'man-above.jpeg'}
          imgWidth={''}
        />
      </EndTile>
      <EndTile>
        <EndTileContent
          title={'Sobre Thiago'}
          subtitle={'Conheça um pouco sobre mim e minha história.'}
          img={'me.png'}
          imgWidth={'w-[70%] me grayscale-[40%]'}
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
  if (isLink) return <Link to="/codice-desvelado">{children}</Link>;

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
      className="h-[150px] md:h-[160px] lg:h-[200px] drop-shadow-xl w-full md:w-[50%] rounded-lg flex flex-row justify-between items-center bg-gray-200 overflow-hidden lg:max-h-[150px] xl:max-h-[180px]"
      onMouseOver={toggleHover}
      onMouseOut={toggleHover}
      onClick={() => onOpenModal(true)}
    >
      <div className="w-[50%] flex flex-col justify-center items-start p-4 xl:p-6 3xl:p-10 font-poppins gap-2">
        <h6
          className={`${
            isHoveredTile ? 'text-blue-500' : 'text-gray-800'
          } text-lg lg:text-sm xl:text-lg 2xl:text-xl 3xl:text-2xl  duration-200`}
        >
          {title}
        </h6>
        <p className="text-gray-500 text-sm lg:text-xs xl:text-sm 3xl:text-base">
          {' '}
          {subtitle}
        </p>
      </div>

      <div className=" w-[50%] overflow-hidden flex flex-row justify-end h-full">
        <img
          src={img}
          alt=""
          className={`${
            isHoveredTile ? 'scale-125' : ''
          }   duration-200 h-full rounded-r-lg ${imgWidth} sca`}
        ></img>
      </div>
    </div>
  );
}

export default Ending;
