import {
  redirect,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import RouterModal from "../Utils/RouterModal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Button from "./../Utils/Button";
import useDelete from "./../hooks/useDelete";
import Loader from "./../Utils/Loader";
import Error from "./../Utils/Error";
import axios from "axios";
import { useState } from "react";

function ArchivedProjectDetails() {
  const { projectId } = useParams();
  const [archivedProjects, setArchivedProjects] = useOutletContext();
  const [isLoadingActive, setIsLoadingActive] = useState(false);
  const [errorActive, setErrorActive] = useState("");

  const navigate = useNavigate();

  const project = archivedProjects.find((project) => project._id === projectId);

  const {
    isLoading,
    error,
    handler: handleDelete,
  } = useDelete({
    redirectTo: "/admin/dashboard/project-requests/archive",
    id: projectId,
    path: `/api/v1/project-requests/${projectId}`,
    action: () =>
      setArchivedProjects((state) =>
        state.filter((project) => project._id !== projectId),
      ),
  });

  async function handleActive() {
    try {
      setIsLoadingActive(true);
      await axios.patch(
        `/api/v1/project-requests/${projectId}`,
        {
          isArchived: false,
        },
        { withCredentials: true },
      );

      navigate("/admin/dashboard/project-requests");
    } catch (err) {
      console.log(err);
      setErrorActive(err.response.data.message);
    } finally {
      setIsLoadingActive(false);
    }
  }

  return (
    <RouterModal
      path={`/admin/dashboard/project-requests/archive`}
      height="min-h-[30svh] max-h-[85svh]"
      closeTop="top-6"
    >
      <div className="relative flex h-full w-full flex-col items-center justify-start gap-6 overflow-y-scroll px-6 py-10">
        {isLoading && <Loader />}
        {isLoadingActive && <Loader />}
        {error && (
          <Error
            path={`/admin/dashboard/project-requests/archive`}
            message={error}
          />
        )}
        {errorActive && (
          <Error
            path={`/admin/dashboard/project-requests/archive`}
            message={errorActive}
          />
        )}
        {!isLoading && !isLoadingActive && !errorActive && !error && (
          <>
            <h1 className="text-xl text-gray-800 drop-shadow">
              {project?.name}
            </h1>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-gray-800">
                {project?.position} | {project?.company}
              </p>
              <p className="text-sm text-gray-500">{project?.email}</p>
            </div>

            <p>{project?.description}</p>
            <div className="flex flex-col items-center justify-center gap-1 text-gray-500">
              <p>ID: {project?._id}</p>
              <p className="">
                Criado em{" "}
                {format(project?.createdAt, "dd MMM'. de' yyyy", {
                  locale: ptBR,
                })}
              </p>
            </div>
            <div className="flex w-full flex-row items-center justify-around">
              <Button
                width={"w-[40%]"}
                bgColor="bg-red-600"
                textColor="text-gray-50"
                type="action"
                onAction={() => handleDelete()}
              >
                Deletar
              </Button>
              <Button
                width={"w-[40%]"}
                type="action"
                onAction={() => handleActive()}
              >
                Ativar
              </Button>
            </div>
          </>
        )}
      </div>
    </RouterModal>
  );
}

export default ArchivedProjectDetails;
