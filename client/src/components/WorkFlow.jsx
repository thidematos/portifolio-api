import { Title } from './Works';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';

import { EffectCreative, Navigation } from 'swiper/modules';
import { useState } from 'react';

function WorkFlow({ isMobile }) {
  const [progress, setProgress] = useState(1);

  const steps = [
    {
      num: 1,
      title: 'Solicitação de Projeto',
      text: 'A primeira etapa de nossa colaboração é a solicitação de um projeto. Ela me dará uma ideia geral sobre suas expectativa em relação ao produto. Se eu for a pessoa certa para seu projeto, nós vamos agendar uma reunião para explorar mais detalhes.',
    },
    {
      num: 2,
      title: 'Primeira Reunião',
      text: 'Em nossa reunião inicial, delimitaremos o escopo do projeto. É o momento de avaliar todas as funcionalidades que podem ser úteis ao seu negócio. Também devemos tirar todas as nossas dúvidas e definir nossos próximos passos.',
    },
    {
      num: 3,
      title: 'Proposta Individual',
      text: 'Depois que definirmos o escopo do projeto, criarei uma proposta individual. Eu avalio o orçamento com base no projeto completo, não por hora trabalhada. Assim, você saberá o quanto custará todo o produto, sem surpresas. Além disso, também vou elaborar um cronograma para o projeto.',
    },
    {
      num: 4,
      title: 'Implementação',
      text: 'Estou pronto para começar a implementação do produto. É essencial estabelecer uma comunicação transparente, com atualizações regulares dos estágios de desenvolvimento do produto. Dessa forma, posso me orientar de acordo com seus feedbacks.',
    },
    {
      num: 5,
      title: 'Lançamento',
      text: 'O projeto finalizado passará por um último teste criterioso, de qualidade e segurança, para garantir que todos os detalhes estão corretos. Por fim, posso te ajudar a hospedá-lo em algum serviço ou exportar todo o código do produto.',
    },
  ];

  return (
    <section
      className="w-full md:min-h-none lg:min-h-screen bg-gray-100 flex flex-col justify-start items-center py-24 md:py-32 lg:py-20 xl:py-24 2xl:py-28 3xl:py-44"
      id="processo"
    >
      <Title>O processo de criação de um projeto.</Title>
      <CoverflowSwiper
        setProgress={setProgress}
        steps={steps}
        isMobile={isMobile}
      />
      <ProgressBar steps={steps} progress={progress} />
    </section>
  );
}

function CoverflowSwiper({ setProgress, steps, isMobile }) {
  const updateProgress = (e) => setProgress(e.realIndex + 1);

  return (
    <div className="w-full relative">
      <Swiper
        effect={'creative'}
        grabCursor={true}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ['-20%', 0, -1],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        loop={true}
        navigation={{
          nextEl: '.rightArrow',
          prevEl: '.leftArrow',
        }}
        modules={[EffectCreative, Navigation]}
        onRealIndexChange={updateProgress}
        className="mySwiper max-w-[350px] md:max-w-[600px] xl:max-w-[700px] w-full h-[230px] md:h-[260px] lg:h-[230px] xl:h-[300px] mt-20 md:mt-24 lg:mt-20 xl:mt-24 2xl:mt-28 3xl:mt-36 rounded-xl shadow-lg"
      >
        {steps.map((step) => (
          <SwiperSlide className="flowSlide" key={step.num}>
            <SlideContent step={step} />
          </SwiperSlide>
        ))}
      </Swiper>
      {isMobile || (
        <>
          <img
            src="right-arrow.png"
            alt=""
            className="rightArrow absolute top-[58%] w-[2%] md:right-[5%] lg:right-[13%] xl:right-[18%] 2xl:right-[23%] 3xl:right-[25%] cursor-pointer"
          ></img>

          <img
            src="left-arrow.png"
            alt=""
            className="leftArrow absolute top-[58%] w-[2%] md:left-[5%] lg:left-[13%] xl:left-[18%] 2xl:left-[23%] 3xl:left-[25%] cursor-pointer"
          ></img>
        </>
      )}
    </div>
  );
}

function ProgressBar({ progress, steps }) {
  const progressPercentage = (100 / steps.length) * progress;

  let widthStr = `w-[${progressPercentage}%]`;

  if (widthStr === 'w-[80%]') widthStr = 'width80';

  if (widthStr === 'w-[100%]') widthStr = 'w-full';

  return (
    <div className="w-[60%] md:w-[40%] lg:w-[30%] bg-gray-300 h-[10px] lg:h-[7px] xl:h-[10px] rounded-xl shadow-xl mt-12">
      <div
        className={`${widthStr} bg-blue-500 h-[10px] lg:h-[7px] xl:h-[10px] rounded-xl duration-500 origin-left`}
      ></div>
    </div>
  );
}

function SlideContent({ step }) {
  return (
    <div className="flex flex-row justify-center items-center w-full h-full rounded-xl">
      <h6 className="w-[10%] md:w-[25%] h-full flex flex-row justify-center items-center font-noto text-gray-400 text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl  bg-gray-200 px-6 md:px-16">
        {step.num}
      </h6>
      <div className="w-[90%] md:w-[75%] h-full flex flex-col justify-center items-start px-6 md:px-16 gap-4">
        <h6 className="font-poppins text-blue-500 drop-shadow-lg text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl">
          {step.title}
        </h6>
        <p className="font-poppins tracking-wider text-gray-500 text-xs md:text-sm lg:text-xs xl:text-sm 3xl:text-base">
          {step.text}
        </p>
      </div>
    </div>
  );
}

export default WorkFlow;
