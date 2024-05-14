import { useState } from "react";
import { useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import { intervalToDuration, startOfToday } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

function AnswerProjectRequest() {
  const { requestId } = useParams();
  const [projectRequest, setProjectRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useGet(
    setProjectRequest,
    "projectRequest",
    `/api/v1/project-requests/${requestId}`,
    true,
    setIsLoading,
    setError,
  );

  console.log(projectRequest);

  return (
    <div className="flex w-full grow flex-col items-center justify-start gap-4 px-6 font-poppins ">
      <div className="flex w-[90%] flex-col items-start justify-center">
        <Header />
        <SentList />
      </div>
      <Swiper className=" flex w-full grow " loop={true}>
        <SwiperSlide className=" flex w-full flex-col items-center justify-start">
          <ProjectInfo projectRequest={projectRequest} />
        </SwiperSlide>
        <SwiperSlide className=" flex w-full flex-col items-center justify-start">
          <CreateEmail />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

function Header() {
  return <h2 className="text-sm text-gray-800 drop-shadow">EMAILS</h2>;
}

function ProjectInfo({ projectRequest }) {
  const timeSinceRequest = intervalToDuration({
    start: projectRequest?.createdAt,
    end: Date.now(),
  });

  SwitchTimeString(timeSinceRequest);

  return (
    <div className="relative flex w-full grow flex-col items-center justify-center gap-6 ">
      <h2 className="absolute top-0 text-xl text-gray-800 drop-shadow">
        Informações do projeto
      </h2>
      <div className="flex w-full flex-col items-center justify-center">
        <p className="text-lg text-gray-800">
          {projectRequest?.name.toUpperCase()}
        </p>

        <div className="flex w-full flex-row items-center justify-center gap-3">
          <p className=" text-gray-800">
            {projectRequest?.position} | {projectRequest?.company}
          </p>
          <p className="text-xl font-bold text-gray-800">&middot;</p>
          <p>{timeSinceRequest.string}</p>
        </div>
        <p className="py-1 text-sm text-gray-500">
          Budget: {projectRequest?.budget}
        </p>
      </div>

      <p className="indent-8">{projectRequest?.description}</p>
    </div>
  );
}

function CreateEmail() {
  return <div className="w-full grow ">oioioioio</div>;
}

function SentList({ answer }) {
  const [currentSendEmail, setCurrentSendEmail] = useState(0);

  const emailExamples = [
    {
      sendAt: new Date(2024, 4, 27), // 7 dias atrás
      content: `
            Prezado(a) [Nome do Destinatário],
      
            Espero que esteja tudo bem.
      
            Escrevo para você hoje para apresentar [Nome da Sua Empresa] e como podemos ajudá-lo(a) a alcançar seus objetivos de negócios.
      
            [Nome da Sua Empresa] é uma empresa especializada em [Descrição dos Seus Serviços]. Oferecemos uma ampla gama de serviços para atender às suas necessidades, incluindo:

            Temos uma equipe experiente e dedicada que está comprometida em fornecer um serviço de alta qualidade aos nossos clientes. Estamos sempre atualizados sobre as últimas tendências do setor e usamos as tecnologias mais recentes para oferecer as melhores soluções possíveis.
      
            Acreditamos que podemos ajudá-lo(a) a alcançar seus objetivos de negócios. Entre em contato conosco hoje para agendar uma consulta gratuita.
      
            Atenciosamente,
          `,
      subject: "Apresentando [Nome da Sua Empresa]",
    },
    {
      sendAt: new Date(2024, 4, 29),
      content: `
            Prezado(a) Sr(a). [Sobrenome do Destinatário],

            Vi com grande interesse seu anúncio em [Local do Anúncio] para [Produto ou Serviço]. 
      
            Sou [Seu Nome], representante da [Nome da Sua Empresa], empresa especializada em [Descrição dos Seus Serviços]. Acredito que podemos oferecer uma solução completa para suas necessidades de [Produto ou Serviço].
      
            [Nome da Sua Empresa] oferece uma ampla gama de produtos e serviços de alta qualidade, além de preços competitivos e um excelente atendimento ao cliente. 
      
            Gostaria de agendar uma breve reunião com você para discutir suas necessidades em mais detalhes e como podemos ajudá-lo(a) a alcançar seus objetivos.
      
            Aguardo seu retorno.
      
            Atenciosamente,
          `,
      subject: "Proposta para [Produto ou Serviço]",
    },
    {
      sendAt: new Date(2024, 5, 2),
      content: `
            Olá [Nome do Destinatário],
      
            Espero que esteja tudo bem.
      
            Estou entrando em contato para acompanhar o interesse demonstrado em [Produto ou Serviço] da [Nome da Sua Empresa].
      
            Gostaria de saber se você teve a oportunidade de avaliar nosso site e materiais informativos. Se tiver alguma dúvida ou precisar de mais informações, por favor, não hesite em entrar em contato.
      
            Também estamos disponíveis para agendar uma demonstração personalizada de nossos produtos e serviços.
      
            Aguardo seu retorno.
      
            Atenciosamente,
          `,
      subject: "Acompanhando Interesse em [Produto ou Serviço]",
    },
    {
      sendAt: new Date(2024, 5, 5),
      content: `
            Prezado(a) [Nome do Destinatário],
      
            Obrigado por seu interesse em [Produto ou Serviço] da [Nome da Sua Empresa].
      
            Fiquei feliz em saber que você está considerando nossa solução. Acredito que podemos oferecer a você a melhor relação custo-benefício do mercado.
      
            Para tornar sua decisão ainda mais fácil, estamos oferecendo um desconto especial de [Porcentagem]% em seu primeiro pedido. Basta usar o código [Código de Desconto] ao finalizar a compra.
      
            Não perca esta oportunidade! Entre em contato conosco hoje mesmo para saber mais.
      
            Atenciosamente,
          `,
      subject: "Oferta Especial - [Produto ou Serviço]",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        {emailExamples.length > 0 && (
          <SentEmail email={emailExamples?.[currentSendEmail]} />
        )}
      </div>
      <div className="flex w-full flex-row items-center justify-center py-4">
        <button
          className="w-[10%]"
          onClick={() =>
            setCurrentSendEmail((state) =>
              state === 0 ? emailExamples.length - 1 : state - 1,
            )
          }
        >
          <img src="/left-arrow-blue.png" className="w-[50%]" />
        </button>
        <div className="flex w-full flex-row items-center justify-center gap-4">
          {emailExamples.map((email, ind) => (
            <button
              className={`size-[15px] rounded-full shadow-lg duration-150 ${ind === currentSendEmail ? "bg-blue-500" : "bg-gray-300"}`}
              key={ind}
            ></button>
          ))}
        </div>
        <button
          className="w-[10%]"
          onClick={() =>
            setCurrentSendEmail((state) =>
              state === emailExamples.length - 1 ? 0 : state + 1,
            )
          }
        >
          <img src="/left-arrow-blue.png" className="w-[50%] rotate-180" />
        </button>
      </div>
    </div>
  );
}

function SentEmail({ email }) {
  return (
    <div className="relative flex min-h-[80px] flex-row items-center justify-center gap-4 rounded border border-gray-300 px-2 py-3 shadow">
      <div className="w-[15%]">
        <img src="/email-icon.png" className="drop-shadow-lg" />
      </div>
      <div className="w-full">
        <p className="text-sm text-gray-800">{email.subject}</p>
      </div>
      <span className="absolute bottom-0 right-2 text-sm text-gray-400">
        {email.sendAt.toLocaleDateString()}
      </span>
    </div>
  );
}

function SwitchTimeString(timeSinceRequest) {
  switch (
    timeSinceRequest.days ||
    timeSinceRequest.hours ||
    timeSinceRequest.minutes ||
    null
  ) {
    case timeSinceRequest.days:
      timeSinceRequest.string = `${timeSinceRequest.days} dia${timeSinceRequest.days > 1 ? "s" : ""} atrás.`;
      break;

    case timeSinceRequest.hours:
      timeSinceRequest.string = `${timeSinceRequest.hours} hr${timeSinceRequest.hours > 1 ? "s." : "."} atrás.`;
      break;

    case timeSinceRequest.minutes:
      timeSinceRequest.string = `${timeSinceRequest.minutes} min. atrás.`;
      break;

    default:
      timeSinceRequest.string = `Recebido agora.`;
  }

  return timeSinceRequest;
}

export default AnswerProjectRequest;
