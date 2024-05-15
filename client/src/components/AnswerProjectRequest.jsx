import { useState } from "react";
import { useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import { format, intervalToDuration, startOfToday } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "./../Utils/Button";
import { ptBR } from "date-fns/locale";
import Loader from "./../Utils/Loader";
import Error from "./../Utils/Error";

// Import Swiper styles
import "swiper/css";
import axios from "axios";

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
    <div className="relative flex w-full grow flex-col items-center justify-start gap-4 px-6 font-poppins ">
      {isLoading && <Loader position={"absolute centerDivAbsolute"} />}
      {error && (
        <Error
          path={`/admin/dashboard/project-requests/${requestId}`}
          message={error}
        />
      )}
      {!isLoading && !error && (
        <>
          <div className="flex w-[90%] flex-col items-start justify-center">
            <Header />
            <SentList answer={projectRequest?.answers} />
          </div>
          <Swiper className=" flex w-full grow " loop={true}>
            <SwiperSlide className=" flex w-full flex-col items-center justify-start px-2">
              <ProjectInfo projectRequest={projectRequest} />
            </SwiperSlide>
            <SwiperSlide className=" flex w-full flex-col items-center justify-start px-2">
              <CreateEmail
                projectRequest={projectRequest}
                setter={setProjectRequest}
              />
            </SwiperSlide>
          </Swiper>
        </>
      )}
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

function CreateEmail({ projectRequest, setter }) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMail, setSuccessMail] = useState(false);

  async function sendEmail() {
    const email = {
      subject,
      content,
    };

    try {
      setIsLoading(true);
      const res = await axios.patch(
        `/api/v1/project-requests/${projectRequest._id}/sendAnswer`,
        email,
        {
          withCredentials: true,
        },
      );

      setSuccessMail(true);
      setter(res.data.data.projectRequest);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex w-full grow flex-col items-center justify-start gap-6">
      <h2 className="text-xl drop-shadow">NOVO EMAIL</h2>
      {isLoading && <Loader position={"absolute centerDivAbsolute"} />}
      {error && (
        <Error
          path={`/admin/dashboard/project-requests/${projectRequest._id}`}
          message={error}
        />
      )}
      {!isLoading && !error && (
        <>
          {successMail ? (
            <button onClick={setSuccessMail(false)}>Enviar novo email</button>
          ) : (
            <>
              <div className="flex w-full flex-col items-start justify-center gap-2">
                <label className="font-gray-500 ">ASSUNTO</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={`w-full rounded  border p-3 text-sm shadow-lg outline-none ${subject ? "border-blue-500" : "border-gray-400"}`}
                  placeholder="Agendamento de reunião"
                />
              </div>
              <div className="flex w-full grow flex-col items-start justify-center gap-2">
                <label className="font-gray-500 ">CONTEÚDO</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`w-full grow rounded border p-3 text-sm shadow-lg outline-none ${content ? "border-blue-500" : "border-gray-400"}`}
                  placeholder={`Olá, ${projectRequest?.name.split(" ").at(0)}!\nGostaria de agendar nossa reunião.`}
                />
              </div>
              {subject && content ? (
                <Button type="action" onAction={() => sendEmail()}>
                  ENVIAR
                </Button>
              ) : (
                <p className="text-xs text-gray-400">
                  Preencha o assunto e o conteúdo para enviar o email.
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

function SentList({ answer }) {
  const [currentSendEmail, setCurrentSendEmail] = useState(0);
  //É um fiddle para as ANSWERS do ProjectRequest Document.

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        {answer?.length > 0 && <SentEmail email={answer?.[currentSendEmail]} />}
      </div>
      <div className="flex w-full flex-row items-center justify-center py-4">
        <button
          className="w-[10%]"
          onClick={() =>
            setCurrentSendEmail((state) =>
              state === 0 ? answer?.length - 1 : state - 1,
            )
          }
        >
          <img src="/left-arrow-blue.png" className="w-[50%]" />
        </button>
        <div className="flex w-full flex-row items-center justify-center gap-4">
          {answer?.map((email, ind) => (
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
              state === answer?.length - 1 ? 0 : state + 1,
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
        {format(email.sendAt, "dd MMM'. de' yyyy", { locale: ptBR })}
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
