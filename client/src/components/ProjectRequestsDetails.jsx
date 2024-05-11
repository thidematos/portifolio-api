import { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import Button from "./../Utils/Button";
import GoBack from "../Utils/GoBack";
import useDelete from "../hooks/useDelete";
import Loader from "./../Utils/Loader";
import Error from "./../Utils/Error";

function ProjectRequestsDetails() {
  const { requestId } = useParams();
  const [projectRequest, setProjectRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    handler: handleDelete,
    isLoadingDelete,
    errorDelete,
  } = useDelete({
    redirectTo: "/admin/dashboard/project-requests",
    path: `/api/v1/project-requests/${requestId}`,
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
      {isLoadingDelete && <Loader />}
      {error && (
        <Error path={"/admin/dashboard/project-requests"} message={error} />
      )}
      {errorDelete && (
        <Error
          path={"/admin/dashboard/project-requests"}
          message={errorDelete}
        />
      )}
      {!isLoading && !isLoadingDelete && !error && !errorDelete && (
        <>
          <div className="flex flex-col items-center justify-center text-gray-800">
            <h2 className="text-xl ">{projectRequest?.name.toUpperCase()}</h2>
            <p>
              {projectRequest?.position} em {projectRequest?.company}
            </p>
          </div>
          <p className="text-gray-500">ID: {projectRequest?._id}</p>
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
            path={"a"}
            action={"AGENDAR"}
            textColor={"text-gray-50"}
            bgColor={"bg-orange-500"}
            icon={"schedule-icon.png"}
          />
          <Action
            path={"a"}
            action={"RESPONDER"}
            textColor={"text-gray-50"}
            bgColor={"bg-blue-500"}
            icon={"answer-icon.png"}
          />
          {projectRequest?.isAnswered && (
            <Action
              path={"delete"}
              action={"ARQUIVAR"}
              icon={"archive-icon.png"}
              bgColor={"bg-gray-300"}
              textColor={"text-gray-800"}
            />
          )}
          <GoBack
            position={"top-0 left-[10%]"}
            path={"/admin/dashboard/project-requests"}
          />
          <Outlet
            context={{
              handleDelete,
            }}
          />
        </>
      )}
    </div>
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
