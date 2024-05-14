import { useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import Button from "./../Utils/Button";
import GoBack from "../Utils/GoBack";
import useDelete from "../hooks/useDelete";
import Loader from "./../Utils/Loader";
import Error from "./../Utils/Error";
import usePatch from "../hooks/usePatch";
import FloatingButton from "../Utils/FloatingButton";

function ProjectRequestsDetails() {
  const { requestId } = useParams();
  const [projectRequest, setProjectRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    handler: handleArchive,
    isLoadingArchive,
    errorArchive,
  } = usePatch({
    resource: "projectRequest",
    id: requestId,
    field: "isArchived",
    usePath: `/api/v1/project-requests/${requestId}`,
    newValue: true,
    setter: () => null,
    onSuccessAction: () => navigate("/admin/dashboard/project-requests"),
  });

  const {
    handler: handleCurrentProject,
    isLoadingCurrentProject,
    errorCurrentProject,
  } = usePatch({
    resource: "projectRequest",
    id: requestId,
    field: "currentProject",
    usePath: `/api/v1/project-requests/${requestId}`,
    newValue: !projectRequest?.currentProject,
    setter: setProjectRequest,
  });

  useGet(
    setProjectRequest,
    "projectRequest",
    `/api/v1/project-requests/${requestId}`,
    true,
    setIsLoading,
    setError,
  );

  return (
    <div className="relative flex w-full grow flex-col items-center justify-center gap-6 px-10 font-poppins">
      {isLoading && <Loader />}

      {error && (
        <Error path={"/admin/dashboard/project-requests"} message={error} />
      )}

      {!isLoading && !error && (
        <>
          <FloatingButton
            path={"spam"}
            icon={"spam-icon.png"}
            size={"size-[60px]"}
            bgColor={"bg-yellow-400"}
            padding={"p-3"}
            position={"top-[10%] right-6"}
          />
          <Header projectRequest={projectRequest} />
          <CurrentProjectButton
            projectRequest={projectRequest}
            handleCurrentProject={handleCurrentProject}
            isLoadingCurrentProject={isLoadingCurrentProject}
          />
          <Info infoLabel={"EMAIL"} info={projectRequest?.email} />
          <Info infoLabel={"DESCRIÇÃO"} info={projectRequest?.description} />
          <Info infoLabel={"BUDGET"} info={projectRequest?.budget} />
          <Info
            infoLabel={"RECEBIDO EM"}
            info={new Date(projectRequest?.createdAt).toLocaleDateString(
              "pt-BR",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              },
            )}
          />
          <Action
            path={"schedule"}
            action={"AGENDAR"}
            textColor={"text-gray-50"}
            bgColor={"bg-orange-500"}
            icon={"schedule-icon.png"}
          />
          <Action
            path={"answer"}
            action={"RESPONDER"}
            textColor={"text-gray-50"}
            bgColor={"bg-blue-500"}
            icon={"answer-icon.png"}
          />
          {isLoadingArchive && <Loader />}
          {errorArchive && (
            <Error
              message={errorArchive}
              path={"/admin/dashboard/project-requests"}
            />
          )}
          {!isLoadingArchive && !errorArchive && (
            <>
              {projectRequest?.isAnswered &&
                !projectRequest?.currentProject && (
                  <Button
                    bgColor="bg-gray-300"
                    textColor="text-gray-800"
                    width={"w-[60%]"}
                    type="action"
                    onAction={() => handleArchive()}
                  >
                    <div className="flex flex-row items-center justify-center gap-4">
                      <img src="/archive-icon.png" className="w-[25%]" />
                      <span className="text-lg">ARQUIVAR</span>
                    </div>
                  </Button>
                )}
            </>
          )}

          <GoBack
            position={"top-2 left-[10%]"}
            path={"/admin/dashboard/project-requests"}
          />
          <Outlet />
        </>
      )}
    </div>
  );
}

function Header({ projectRequest }) {
  return (
    <>
      <div className=" flex flex-col items-center justify-center text-gray-800">
        <h2 className="text-xl ">{projectRequest?.name.toUpperCase()}</h2>
        <p>
          {projectRequest?.position} em {projectRequest?.company}
        </p>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-1">
        <p
          className={`font-poppins text-xl ${projectRequest?.isAnswered ? "text-blue-500" : "italic text-red-600"}`}
        >
          {projectRequest?.isAnswered ? "Lido" : "Não lido"}
        </p>
        <p className="text-gray-500">ID: {projectRequest?._id}</p>
      </div>
    </>
  );
}

function CurrentProjectButton({
  projectRequest,
  handleCurrentProject,
  isLoadingCurrentProject,
}) {
  return (
    <button
      className="absolute right-6 top-0 w-[15%]"
      onClick={() => handleCurrentProject()}
    >
      {isLoadingCurrentProject && <Loader size={50} />}
      {!isLoadingCurrentProject && (
        <img
          src="/work-icon.png"
          className={`${projectRequest?.currentProject ? "" : "grayscale"} drop-shadow-lg`}
        />
      )}
    </button>
  );
}

function Info({ infoLabel, info }) {
  return (
    <div className="flex w-full flex-col items-start justify-center">
      <p className=" text-gray-500">{infoLabel}</p>
      <p className="text-gray-800">{info}</p>
    </div>
  );
}

function Action({ path, action, bgColor, textColor, icon }) {
  return (
    <Link to={path} className="w-[60%]">
      <button
        className={`${bgColor} ${textColor} flex  flex-row items-center  justify-center gap-4 rounded p-3 text-lg shadow drop-shadow`}
      >
        <img src={`/${icon}`} className="w-[25%]"></img>
        <span>{action}</span>
      </button>
    </Link>
  );
}

export default ProjectRequestsDetails;
