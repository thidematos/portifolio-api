import { useParams } from "react-router-dom";
import RouterModal from "../Utils/RouterModal";
import Button from "../Utils/Button";
import useDelete from "../hooks/useDelete";
import Loader from "../Utils/Loader";
import Error from "../Utils/Error";

function ProjectRequestSpam() {
  const { requestId } = useParams();

  const {
    handler: handleDelete,
    isLoading,
    error,
  } = useDelete({
    redirectTo: "/admin/dashboard/project-requests",
    path: `/api/v1/project-requests/${requestId}`,
  });

  return (
    <RouterModal height="h-auto" closeTop="top-4" path={-1}>
      <div className="flex w-full flex-col items-center justify-center gap-4 px-4 py-10 text-center">
        <h2 className="text-lg text-gray-800">
          Marcar esse projeto como SPAM?
        </h2>
        {isLoading && <Loader size={100} margin="my-4" />}
        {error && (
          <Error
            message={error}
            path={`/admin/dashboard/project-requests/${requestId}`}
          />
        )}
        {!isLoading && !error && (
          <>
            <p className="text-sm text-gray-500">O pedido será excluído.</p>
            <div className="my-4 flex flex-row items-center justify-center gap-4">
              <Button
                type="action"
                bgColor="bg-yellow-400"
                textColor="text-gray-800"
                onAction={() => handleDelete()}
              >
                SPAM
              </Button>
              <Button
                type="back"
                path={`/admin/dashboard/project-requests/${requestId}`}
              >
                Voltar
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Essa ação não pode ser desfeita.
            </p>
          </>
        )}
      </div>
    </RouterModal>
  );
}

export default ProjectRequestSpam;
