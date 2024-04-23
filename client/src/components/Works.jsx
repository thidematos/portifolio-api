import { useEffect, useState } from 'react';
import { ProjectRequest } from './NavBar';
import Modal from './Modal';
import ProjectDetails from './ProjectDetails';
import Loader from './Loader';
import Error from './Error';

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
  const projects = [
    {
      src: 'coliseu-screenshot.png',
      title: 'O Coliseu',
      description:
        'Tradição e qualidade expressos em seu design elegante e clássico.',
      mainImg: './coliseu-hero.png',
      subTitle: 'Detalhes que encantam',
      sections: [
        {
          title: 'Dois negócios, uma empresa',
          description:
            'O Coliseu trabalha com mármores e com esquadrias em alúminio. Criamos um layout para cada negócio, acessível pelo switch. Como um Single Page App, não há a necessidade de recarregar.',
          img: './coliseu-section-1.png',
        },
        {
          title: 'Gerencie seus projetos',
          description:
            'O app do Coliseu permite que a landing page esteja sempre atualizada, exibindo os últimos projetos realizados. Tire uma foto com o celular. Dê um título, uma descrição. E pronto, simples assim.',
          img: './coliseu-section-2.png',
        },
      ],
      finalDetails: {
        year: '2023',
        abilities: 'Design de marca. Landing Page. API personalizada.',
      },
      colors: {
        from: 'from-orange-200',
        to: 'to-red-300',
      },
      link: 'https://marmorariaocoliseu.com.br/',
    },
    {
      src: 'healthsync.png',
      title: 'Healthsync',
      description:
        'Bem estar acessível e integrado. Uma experiência humanizada para pacientes e médicos.',
      mainImg: './healthsync-hero.png',
      subTitle: 'Um fluxo otimizado de informações',
      sections: [
        {
          title: 'Para pacientes e médicos',
          description:
            'O objetivo do Healthsync é centralizar o acesso a todos os processos de uma rotina de Health Care. Pacientes e médicos: todos em um mesmo sistema unificado.',
          img: './healthsync-section-1.png',
        },
        {
          title: 'Agenda de consultas',
          description:
            'Agende consultas com seu médico de forma simples e direta. Transparente. Sem ligações e burocracias desnecessárias.',
          img: './healthsync-section-2.png',
        },
        {
          title: 'Chat em tempo real',
          description:
            'Converse com seu médico em tempo real. Tire dúvidas, peça indicações. Tudo por um atendimento mais humanizado e acolhedor.',
          img: './healthsync-section-3.png',
        },
        {
          title: 'Prontuários detalhados e acessíveis.',
          description:
            'As consultas agendadas pelo Healthsync geram um prontuário. Tenha um registro preciso de seu histórico clínico. Informações que permitem diagnósticos mais precisos.',
          img: './healthsync-section-4.png',
        },
      ],
      finalDetails: {
        year: '2023',
        abilities:
          'Design de produto e marca. Gerenciamento de projeto. API personalizada. Web Sockets.',
      },
      colors: {
        from: 'from-violet-300',
        to: 'to-indigo-400',
      },
      link: 'https://healthsync-9u7e.onrender.com',
    },
    {
      src: 'farm-wise.png',
      title: 'Farm Wise',
      description:
        'A assistência de Wise, um sábio agricultor. Porque somente um produtor compreende as necessidades de outro produtor.',
      mainImg: './farmwise-hero.png',
      subTitle: 'Gente como a gente',
      sections: [
        {
          title: 'Cultivo',
          description:
            'Escolha seu tipo de agricultura e aponte sua localidade. Wise indicará os três plantios mais indicados para você. Veja também sobre o clima da região e os benefícios desses cultivos.',
          img: './farmwise-section-1.1.png',
        },
        {
          title: 'Prosa',
          description:
            'Escreva sua pergunta. O Wise te ajudará da melhor forma possível. É uma conversa mesmo. Nunca serão as mesmas respostas. Como uma boa prosa de fim de tarde',
          img: './farmwise-section-2.1.png',
        },
      ],
      finalDetails: {
        year: '2023',
        abilities:
          'Inteligência Artificial. Design de produto e marca. Gerenciamento de projeto. API personalizada.',
      },
      colors: {
        from: 'from-lime-200',
        to: 'to-sky-300',
      },
      link: 'https://farm-wise.onrender.com/index.html',
    },
    {
      src: 'mapofme.png',
      title: 'The Map of Me',
      description:
        'Uma aventura pelas emoções básicas de nosso cotidiano, de forma lúdica e interativa, criada para crianças com TEA',
      mainImg: './mapofme-hero.png',
      subTitle: 'Explore a floresta das emoções!',
      sections: [
        {
          title: 'Explore suas emoções',
          description:
            'O jogo The Map of Me é composto por oito quebra-cabeças. A cada fase, uma situação nova e mais complexa é apresentada. Avance para conquistar mais um pedaço do mapa da aventura.',
          img: './mapofme-section-1.png',
        },
        {
          title: 'O Transtorno do Espectro Autista',
          description:
            'Compreenda mais sobre o Transtorno do Espector Autista (TEA). Uma área dedicada aos responsáveis, com informações selecionadas e referências sobre o tema.',
          img: './mapofme-section-2.png',
        },
        {
          title: 'Acompanhe o aprendizado',
          description:
            'O desempenho da criança pode ser acompanhado por diversas métricas diferentes, distribuídas por fases. Veja seu tempo de foco, tempo de montagem das quebra-cabeças, número de dicas usadas e error.',
          img: './mapofme-section-3.png',
        },
        {
          title: 'Feedbacks e métricas gerais',
          description:
            'The Map of Me possui um sistema para administradores, que permite acompanhar as métricas de desempenho de todos os jogadores. Também apresenta os feedbacks para cada uma das fases da aventura.',
          img: './mapofme-section-4.png',
        },
      ],
      finalDetails: {
        year: '2023',
        abilities:
          'Design de produto e marca. Levantamento de requisitos. Exploração de mercado. Gerenciamento de projeto. API personalizada.',
      },
      colors: {
        from: 'from-cyan-200',
        to: 'to-orange-200',
      },
      link: 'https://mapofme.cloud/',
    },
  ];

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
      className={`bg-gradient-to-r ${project.colors.from} ${project.colors.to} rounded-2xl flex flex-row justify-center items-end shadow-xl relative md:max-w-none lg:max-w-[350px] xl:max-w-[420px] 2xl:max-w-[500px] 3xl:max-w-[600px]`}
      onMouseOver={toggleIsScalled}
      onMouseOut={toggleIsScalled}
      onClick={() => onOpenProject(project)}
    >
      <button
        className={`duration-300 font-roboto bg-gray-400 text-2xl md:text-3xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl w-[30px] h-[30px] md:w-[50px] md:h-[50px] lg:w-[20px] lg:h-[20px] xl:w-[30px] xl:h-[30px] 2xl:w-[40px] 2xl:h-[40px] 3xl:w-[50px] 3xl:h-[50px] flex flex-col items-center justify-center text-gray-100 p-3 rounded-full absolute left-auto bottom-auto top-[5%] right-[3%] md:top-[30px] md:right-[30px] z-20 ${
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
