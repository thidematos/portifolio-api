import { useRef, useState } from 'react';
import Button from './Button';
import Logo from './Logo';
import RouterModal from './RouterModal';
import ProgressBar from './ProgressBar';
import TestUploader from './TestUploader';
import ColorInput from './ColorInput';

const flex = 'flex flex-col justify-center items-center w-full h-full';

function CreateWork() {
  const [progress, setProgress] = useState(0);
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
  const [sectionPlaceholder, setSectionPlaceholder] = useState({
    title: '',
    description: '',
    img: '',
  });

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
    sections.map((section, ind) => (
      <SectionInfo
        key={ind}
        onNext={handleNext}
        setter={setSections}
        statePlaceholder={[sectionPlaceholder, setSectionPlaceholder]}
      />
    ))
  );

  function handleChangeColor(e, direction) {
    setColors((state) => {
      return {
        ...state,
        [`${direction}`]: e.target.value,
      };
    });
  }

  function handleNext() {
    setProgress((currentProgress) => {
      return currentProgress <= arrayToRender.length ? currentProgress + 1 : 0;
    });
  }

  return (
    <RouterModal path={-1} isModalScrollable={true}>
      <div className="flex flex-col justify-start items-center w-full h-full relative py-6">
        <Logo fontSize={'text-4xl'} margin="mb-6" />
        {progress ? (
          <MySwiper>
            {arrayToRender.map((el, ind) => (
              <Slide index={ind + 1} progress={progress} key={ind}>
                {el}
              </Slide>
            ))}
          </MySwiper>
        ) : (
          <Start onNext={handleNext} />
        )}
        <ProgressBar
          progress={Number(progress)}
          steps={Number(arrayToRender.length)}
          position="absolute bottom-2"
        />
      </div>
    </RouterModal>
  );
}

function MySwiper({ children }) {
  return (
    <div className="w-full h-[100%] markup overflow-x-hidden flex flex-row flex-nowrap justify-center items-center relative ">
      {children}
    </div>
  );
}

function Slide({ index, children, progress }) {
  return (
    <div
      style={{ transform: `translate(${(index - progress) * 100}%)` }}
      className={`${flex} markup absolute duration-500
      `}
    >
      {children}
    </div>
  );
}

function Start({ onNext }) {
  return (
    <div className="w-full markup h-full flex flex-col justify-center items-center font-poppins gap-10">
      <h2 className="text-xl w-[80%] text-center text-gray-800 drop-shadow">
        Bem vindo à criação de Projetos
      </h2>
      <p className="text-sm text-gray-500 text-center">
        Vamos guiá-lo por cada uma das etapas.
      </p>
      <Button type="action" onAction={() => onNext()}>
        Começar &rarr;
      </Button>
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
        <p className="font-poppins text-gray-600 text-lg">Imagem principal</p>
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

function SectionInfo({ onNext, setter, statePlaceholder }) {
  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-full font-poppins`}
    >
      <h2 className="text-gray-700 text-lg drop my-3">SEÇÃO</h2>
      <InputText
        label={'Título'}
        state={statePlaceholder[0].title}
        setter={(value) =>
          statePlaceholder[1]((state) => {
            return {
              ...state,
              title: value,
            };
          })
        }
      />
      <Textarea
        label={'Descrição'}
        state={statePlaceholder[0].description}
        setter={(value) =>
          statePlaceholder[1]((state) => {
            return {
              ...state,
              description: value,
            };
          })
        }
      />
      <div className="flex flex-col justify-center items-center gap-3 w-full py-3">
        <p className="font-poppins text-gray-600 text-lg">Imagem</p>
        <TestUploader
          multiple={false}
          guide={'Clique para adicionar uma imagem'}
          setter={(file) =>
            statePlaceholder[1]((state) => {
              return {
                ...state,
                img: file,
              };
            })
          }
          withDialogueBox={false}
        />
      </div>
      {statePlaceholder[0].title &&
        statePlaceholder[0].description &&
        statePlaceholder[0].img && (
          <div className="w-full flex flex-row justify-around items-center">
            <Button>Finalizar</Button>
            <Button
              type="action"
              onAction={() => {
                onNext();
                setter((state) => [statePlaceholder[0], ...state]);
                statePlaceholder[1]({
                  title: '',
                  description: '',
                  img: '',
                });
              }}
            >
              Nova seção
            </Button>
          </div>
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
