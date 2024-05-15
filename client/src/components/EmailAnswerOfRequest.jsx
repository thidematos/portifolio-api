import { useOutletContext, useSearchParams } from "react-router-dom";
import RouterModal from "../Utils/RouterModal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import FloatingButton from "../Utils/FloatingButton";

function EmailAnswerOfRequest() {
  const projectRequest = useOutletContext();
  const [searchParams] = useSearchParams();

  const email = projectRequest?.answers.find(
    (answer) => answer._id === searchParams.get("id"),
  );

  return (
    <RouterModal
      path={`/admin/dashboard/project-requests/${projectRequest?._id}/answer`}
      height="h-auto max-h-[85svh] overflow-y-scroll"
      closeTop="top-5"
    >
      <div className="relative flex min-h-full w-full flex-col items-center justify-start gap-6 px-6 py-10">
        <h2 className="text-xl text-blue-500 drop-shadow">DETALHES DO EMAIL</h2>

        <p className="text-sm text-gray-800">ID: {email._id}</p>

        <div className="flex w-full flex-col items-start justify-center gap-1">
          <p className=" text-blue-500">Assunto</p>
          <p className="text-gray-800">{email.subject}</p>
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-1">
          <p className=" text-blue-500">Conteúdo</p>
          <p className="text-gray-800">{email.content}</p>
        </div>
        <p className="text-sm text-gray-500">
          Enviado em{" "}
          {format(email.sendAt, "dd  MMM'. de' yyyy", { locale: ptBR })}.
        </p>
      </div>
    </RouterModal>
  );
}

export default EmailAnswerOfRequest;
