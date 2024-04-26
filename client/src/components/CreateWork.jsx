import { useEffect, useState } from 'react';
import Button from './Button';
import Logo from './Logo';
import RouterModal from './RouterModal';
import ProgressBar from './ProgressBar';
import TestUploader from './TestUploader';
import ColorInput from './ColorInput';
import ErrorNotification from './ErrorNotification';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Error from './Error';
import Loader from './Loader';

const flex = 'flex flex-col justify-center items-center w-full h-full';

function CreateWork() {
  const [progress, setProgress] = useState(0);
  const [src, setSrc] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mainImg, setMainImg] = useState(null);
  const [projectLogo, setProjectLogo] = useState(null);
  const [abilities, setAbilities] = useState('');
  const [link, setLink] = useState('');
  const [year, setYear] = useState('');
  const [colors, setColors] = useState({
    from: '#3b82f6',
    to: '#f97316',
  });
  const [sections, setSections] = useState([
    {
      title: '',
      description: '',
      img: '',
    },
  ]);
  const [errorNotification, setErrorNotification] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const slides = [
    <FirstInfo
      key={'a'}
      states={{
        title: [title, setTitle],
        subTitle: [subTitle, setSubTitle],
        mainImg: [mainImg, setMainImg],
        onNext: handleNext,
      }}
    />,
    <SecondInfo
      key={'b'}
      states={{
        description: [description, setDescription],
        projectLogo: [projectLogo, setProjectLogo],
        onNext: handleNext,
      }}
    />,
    <ThirdInfo
      key={'c'}
      states={{
        abilities: [abilities, setAbilities],
        year: [year, setYear],
        link: [link, setLink],
        colors: [colors, handleChangeColor],
        onNext: handleNext,
      }}
    />,
  ];

  const arrayToRender = slides.concat(
    sections.map((section, ind, arr) => (
      <SectionInfo
        key={ind}
        onNext={handleNext}
        setter={setSections}
        section={section}
        index={ind}
        entireArray={arr}
        setProgress={setProgress}
        handleFinish={handleFinish}
      />
    ))
  );

  const [progressLength, setProgressLength] = useState(arrayToRender.length);

  useEffect(() => {
    setProgressLength(arrayToRender.length);
  }, [arrayToRender]);

  function handleChangeColor(e, direction) {
    setColors((state) => {
      return {
        ...state,
        [`${direction}`]: e.target.value,
      };
    });
  }

  function handleNext() {
    setProgress((currentProgress) => currentProgress + 1);
  }

  function handlePrev() {
    setProgress((currentProgress) =>
      currentProgress > 0 ? currentProgress - 1 : currentProgress
    );
  }

  function verifyFormComplete() {
    if (!src)
      return [false, setErrorNotification('O projeto precisa de uma capa!')];

    if (!title)
      return [false, setErrorNotification('O projeto precisa de um título!')];
    if (!subTitle)
      return [
        false,
        setErrorNotification('O projeto precisa de um sub título!'),
      ];
    if (!description)
      return [
        false,
        setErrorNotification('O projeto precisa de uma descrição!'),
      ];
    if (!mainImg)
      return [
        false,
        setErrorNotification('O projeto precisa de uma imagem principal!'),
      ];
    if (!projectLogo)
      return [false, setErrorNotification('O projeto precisa de uma logo!')];
    if (!abilities)
      return [
        false,
        setErrorNotification('O projeto precisa de um set de habilidades!'),
      ];
    if (!year)
      return [false, setErrorNotification('O projeto precisa de um ano!')];
    if (!link)
      return [false, setErrorNotification('O projeto precisa de um deploy!')];

    if (!Object.values(colors).length === 2)
      return [false, setErrorNotification('O projeto precisa de cores!')];

    sections.forEach((section) => {
      if (!Object.values(section).length === 3)
        return [
          false,
          setErrorNotification('As seções do projeto precisam ser completas!'),
        ];
    });

    return [true, null];
  }

  async function postWork(form) {
    try {
      setIsLoading(true);
      const res = await axios.post('/api/v1/works', form, {
        withCredentials: true,
      });

      console.log(res);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
      navigate('/admin/dashboard/works');
    }
  }

  function handleFinish() {
    const [status, errorHandler] = verifyFormComplete();

    if (!status) return errorHandler();

    const newWork = new FormData();
    newWork.append('src', src);
    newWork.append('title', title);
    newWork.append('description', description);
    newWork.append('mainImg', mainImg);
    newWork.append('subTitle', subTitle);
    newWork.append('year', year);
    newWork.append('abilities', abilities);
    newWork.append('colors', JSON.stringify(colors));
    newWork.append('projectLogo', projectLogo);
    newWork.append('link', link);
    newWork.append('sections', JSON.stringify(sections));

    sections.forEach((section) => newWork.append('sectionImg', section.img));

    console.log([...Object.entries(newWork)]);

    postWork(newWork);
  }

  return (
    <RouterModal path={-1} isModalScrollable={true}>
      <div className="flex flex-col justify-start items-center w-full h-full relative py-6">
        <Logo fontSize={'text-4xl'} margin="mb-6" />
        {isLoading && <Loader />}
        {error && <Error />}
        {!isLoading && !error && (
          <>
            <img
              src="/roll-back.png"
              className={`rounded-full absolute w-[10%] bg-white p-2 top-4 left-4 ${
                progress > 1 ? 'block' : 'hidden'
              }`}
              onClick={handlePrev}
            />
            {progress ? (
              <MySwiper>
                {arrayToRender.map((el, ind) => (
                  <Slide index={ind + 1} progress={progress} key={ind}>
                    {el}
                  </Slide>
                ))}
              </MySwiper>
            ) : (
              <Start onNext={handleNext} srcState={[src, setSrc]} />
            )}
            <ProgressBar
              progress={Number(progress)}
              steps={progressLength}
              position="absolute bottom-2"
            />
            {errorNotification && (
              <ErrorNotification
                error={errorNotification}
                bgColor={'bg-orange-400/90'}
                textColor={'text-gray-50'}
                position={'bottom-5'}
                width={'w-[85%]'}
                setError={setErrorNotification}
              />
            )}
          </>
        )}
      </div>
    </RouterModal>
  );
}

function SectionInfo({
  onNext,
  setter,
  section,
  index,
  entireArray,
  setProgress,
  handleFinish,
}) {
  return (
    <div
      className={`flex flex-col justify-start items-center w-full h-full font-poppins relative`}
    >
      <img
        src="/thrash-can.png"
        className={`absolute w-[12%]  top-1 bg-gray-200 shadow drop-shadow-sm right-10 border border-orange-300 rounded p-1 ${
          entireArray.length === 1 ? 'hidden' : 'block'
        }`}
        onClick={() =>
          setter((sections) => {
            if (sections.length - 1 === index)
              setProgress((currentProgress) => currentProgress - 1);
            return sections.filter((section, ind) => ind !== index);
          })
        }
      />
      <h2 className="text-gray-700 text-lg drop my-3">SEÇÃO</h2>
      <InputText
        label={'Título'}
        state={section.title}
        setter={(value) =>
          setter((sections) => {
            return sections.map((section, ind) =>
              index === ind
                ? {
                    ...section,
                    title: value,
                  }
                : section
            );
          })
        }
      />
      <Textarea
        label={'Descrição'}
        state={section.description}
        setter={(value) =>
          setter((sections) => {
            return sections.map((section, ind) =>
              index === ind
                ? {
                    ...section,
                    description: value,
                  }
                : section
            );
          })
        }
      />
      <div className="flex flex-col justify-center items-center gap-3 w-full py-3">
        <p className="font-poppins text-gray-600 text-lg">Imagem</p>
        <TestUploader
          multiple={false}
          guide={'Clique para adicionar uma imagem'}
          setter={(value) =>
            setter((sections) => {
              return sections.map((section, ind) =>
                index === ind
                  ? {
                      ...section,
                      img: value,
                    }
                  : section
              );
            })
          }
          withDialogueBox={false}
        />
      </div>
      {section.title && section.description && section.img && (
        <div className="w-full flex flex-row justify-around items-center">
          {entireArray.length - 1 === index ? (
            <>
              <Button
                width={'w-[40%]'}
                bgColor="bg-orange-400"
                onAction={() => handleFinish()}
              >
                Finalizar
              </Button>
              <Button
                width={'w-[40%]'}
                type="action"
                onAction={() => {
                  onNext();
                  setter((sections) => [
                    ...sections,
                    {
                      title: '',
                      description: '',
                      img: '',
                    },
                  ]);
                }}
              >
                Nova seção
              </Button>
            </>
          ) : (
            <Button margin={'mt-3'} type="action" onAction={() => onNext()}>
              Próximo &rarr;
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function MySwiper({ children }) {
  return (
    <div className="w-full h-[100%] overflow-x-hidden flex flex-row flex-nowrap justify-center items-center relative ">
      {children}
    </div>
  );
}

function Slide({ index, children, progress }) {
  return (
    <div
      style={{ transform: `translate(${(index - progress) * 100}%)` }}
      className={`${flex} absolute duration-500
      `}
    >
      {children}
    </div>
  );
}

function Start({ onNext, srcState }) {
  return (
    <div className="w-full  h-full flex flex-col justify-center items-center font-poppins">
      <h2 className="text-xl w-[80%] text-center text-gray-800 drop-shadow">
        Bem vindo à criação de Projetos
      </h2>
      <p className="text-sm text-gray-500 text-center w-[80%] mt-10">
        Inicie com uma capa para o seu projeto!
      </p>
      <TestUploader
        multiple={false}
        guide={'Selecione uma capa para seu projeto.'}
        setter={srcState[1]}
        withDialogueBox={false}
      />
      {srcState[0] && (
        <Button margin={'mt-10'} type="action" onAction={() => onNext()}>
          Começar &rarr;
        </Button>
      )}
    </div>
  );
}

function FirstInfo({ states }) {
  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-full font-poppins`}
    >
      <h2 className="text-gray-700 text-lg drop my-3">PRIMEIRAS INFORMAÇÕES</h2>
      <InputText
        label={'Título'}
        state={states.title[0]}
        setter={states.title[1]}
      />
      <InputText
        label={'Sub título'}
        state={states.subTitle[0]}
        setter={states.subTitle[1]}
      />
      <div className="flex flex-col justify-center items-center gap-3 w-full py-3">
        <p className="font-poppins text-gray-600 text-lg">Hero</p>
        <TestUploader
          multiple={false}
          guide={'Clique para adicionar uma imagem'}
          setter={states.mainImg[1]}
          withDialogueBox={false}
        />
      </div>

      {Boolean(states.title[0]) &&
        Boolean(states.subTitle[0]) &&
        Boolean(states.mainImg[0]) && (
          <Button
            margin={'mt-3'}
            type="action"
            onAction={() => states.onNext()}
          >
            Próximo &rarr;
          </Button>
        )}
    </div>
  );
}

function SecondInfo({ states }) {
  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-full font-poppins`}
    >
      <h2 className="text-gray-700 text-lg drop my-3">IDENTIDADE</h2>
      <Textarea
        label={'Detalhes'}
        state={states.description[0]}
        setter={states.description[1]}
      />
      <div className="flex flex-col justify-center items-center gap-3 w-full py-3">
        <p className="font-poppins text-gray-600 text-lg">Logo do projeto</p>
        <TestUploader
          multiple={false}
          guide={'Clique para adicionar uma imagem'}
          setter={states.projectLogo[1]}
          withDialogueBox={false}
        />
      </div>
      {states.description[0] && states.projectLogo[0] && (
        <Button margin={'mt-3'} type="action" onAction={() => states.onNext()}>
          Próximo &rarr;
        </Button>
      )}
    </div>
  );
}

function ThirdInfo({ states }) {
  return (
    //link year abilites colors
    <div
      className={`flex flex-col justify-center items-center w-full h-full font-poppins`}
    >
      <h2 className="text-gray-700 text-lg drop my-3">ENTREGA</h2>
      <InputText
        label={'Deploy'}
        state={states.link[0]}
        setter={states.link[1]}
      />
      <div className="flex flex-col justify-center items-center gap-5 w-full py-3">
        <p className="font-poppins text-gray-600 text-lg">Cores</p>
        <div className="flex flex-row justify-around w-[80%] items-center">
          <ColorInput
            label={'From'}
            direction={'from'}
            color={states.colors[0]}
            onChangeColor={states.colors[1]}
          />
          <ColorInput
            label={'To'}
            direction={'to'}
            color={states.colors[0]}
            onChangeColor={states.colors[1]}
          />
        </div>
      </div>
      <Textarea
        label={'Habilidades'}
        state={states.abilities[0]}
        setter={states.abilities[1]}
      />
      <InputText label={'Ano'} state={states.year[0]} setter={states.year[1]} />

      {Boolean(states.link[0]) &&
        Boolean(states.abilities[0]) &&
        Boolean(states.year[0]) && (
          <Button
            margin={'mt-3'}
            type="action"
            onAction={() => states.onNext()}
          >
            Próximo &rarr;
          </Button>
        )}
    </div>
  );
}

function InputText({ label, state, setter }) {
  return (
    <div className="flex flex-col justify-center items-start gap-1 w-[70%] my-3">
      <label className="text-gray-600 text-lg" htmlFor={Math.random()}>
        {label}
      </label>
      <input
        type="text"
        value={state}
        id={Math.random()}
        onChange={(e) => setter(e.target.value)}
        className="w-full p-2 text-gray-700 border border-gray-400 rounded shadow text-sm"
      />
    </div>
  );
}

function Textarea({ label, state, setter }) {
  return (
    <div className="flex flex-col justify-center items-start gap-1 w-[70%] my-3">
      <label className="text-gray-600 text-lg" id={Math.random()}>
        {label}
      </label>
      <textarea
        type="text"
        cols="20"
        rows="5"
        id={Math.random()}
        value={state}
        onChange={(e) => setter(e.target.value)}
        className="w-full p-2 text-gray-700 border border-gray-400 rounded shadow text-sm"
      />
    </div>
  );
}

export default CreateWork;
