import { useEffect, useState } from 'react';
import { ProjectRequest } from './NavBar';
import Modal from '../Utils/Modal';
import ProjectDetails from './ProjectDetails';
import Loader from '../Utils/Loader';
import Error from '../Utils/Error';

function Works() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentProject, setCurrentProject] = useState({});
  const [works, setWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getWorks = async () => {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch('/api/v1/works/?sort=viewOrder');
        const dataWorks = await res.json();

        setWorks(dataWorks.data.works);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getWorks();
  }, []);

  function handleOpenProject(project) {
    setIsOpenModal(true);
    setCurrentProject(project);
  }

  function handleCloseProject() {
    setIsOpenModal(false);
    setCurrentProject({});
  }

  return (
    <section
      id="projetos"
      className="min-h-screen bg-gray-100 w-full flex flex-col justify-evenly items-center  py-16 md:py-20 lg:py-16 xl:py-20 2xl:py-24 3xl:py-36"
    >
      <Title>Uma amostra dos meus projetos.</Title>
      {!isLoading && !error && (
        <BoxWorks onOpenProject={handleOpenProject} works={works} />
      )}

      {isLoading && <Loader />}

      {error && <Error message={error} />}

      <Modal
        isModalProject={true}
        isOpenModal={isOpenModal}
        onOpenModal={setIsOpenModal}
      >
        <ProjectDetails
          project={currentProject}
          onCloseProject={handleCloseProject}
        />
      </Modal>
    </section>
  );
}

function Title({ children }) {
  return (
    <h3 className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl  font-poppins text-gray-900 tracking-tight drop-shadow w-[60%] lg:w-[40%] xl:w-[35%] text-center ">
      {children}
    </h3>
  );
}

function BoxWorks({ onOpenProject, works }) {
  //Preciso fazer o botão de carregar mais projetos.

  return (
    <div className="flex flex-row justify-center items-center flex-wrap mt-16 md:mt-20 lg:mt-16 xl:mt-20 2xl:mt-24 3xl:mt-36 gap-6 md:gap-10 w-[90%] md:w-[80%] xl:w-[70%]">
      {works.map((project, ind) => (
        <Project project={project} key={ind} onOpenProject={onOpenProject} />
      ))}
      {works.length > 4 && (
        <ProjectRequest>
          <span className="text-xl drop-shadow-sm">Mais projetos +</span>
        </ProjectRequest>
      )}
    </div>
  );
}

function Project({ project, onOpenProject }) {
  const [isScalled, setIsScalled] = useState(false);

  const toggleIsScalled = (e) => {
    setIsScalled((state) => !state);
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, ${project.colors.from},${project.colors.to})`,
      }}
      className={`rounded-2xl flex flex-row justify-center items-end shadow-xl relative md:max-w-none lg:max-w-[350px] xl:max-w-[420px] 2xl:max-w-[500px] 3xl:max-w-[600px]`}
      onMouseOver={toggleIsScalled}
      onMouseOut={toggleIsScalled}
      onClick={() => onOpenProject(project)}
    >
      <button
        className={` duration-300 font-roboto bg-gray-400 text-2xl md:text-3xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl w-[30px] h-[30px] md:w-[50px] md:h-[50px] lg:w-[20px] lg:h-[20px] xl:w-[30px] xl:h-[30px] 2xl:w-[40px] 2xl:h-[40px] 3xl:w-[50px] 3xl:h-[50px] flex flex-col items-center justify-center text-gray-100 p-3 rounded-full absolute left-auto bottom-auto top-[5%] right-[3%] md:top-[30px] md:right-[30px] z-20 ${
          isScalled ? 'opacity-85' : 'opacity-0'
        }`}
      >
        +
      </button>
      <img
        src={project.src}
        alt=""
        className={` duration-300 drop-shadow-lg  ${
          isScalled
            ? 'upscale rounded-2xl cursor-pointer'
            : 'downscale rounded-x-lg rounded-t-lg'
        }`}
      ></img>
    </div>
  );
}

export { Works, Title };
