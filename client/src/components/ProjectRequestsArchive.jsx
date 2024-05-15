import { useState } from "react";
import useGet from "./../hooks/useGet";
import GoBack from "./../Utils/GoBack";
import { Link, Outlet } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Loader from "./../Utils/Loader";
import Error from "./../Utils/Error";

function ProjectRequestsArchive() {
  const [archivedProjects, setArchivedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useGet(
    setArchivedProjects,
    "projectRequests",
    "/api/v1/project-requests?isArchived=true",
    true,
    setIsLoading,
    setError,
  );

  console.log(archivedProjects);

  return (
    <div className="relative flex w-full grow flex-col items-center justify-start gap-6 font-poppins">
      <h2 className=" mt-2 text-xl text-blue-500 drop-shadow">ARQUIVADOS</h2>
      {isLoading && <Loader position={"absolute centerDivAbsolute"} />}
      {error && (
        <Error message={error} path={"/admin/dashboard/project-requests"} />
      )}
      {!isLoading && !error && (
        <>
          {archivedProjects?.length > 0 ? (
            <Archive archivedRequests={archivedProjects} />
          ) : (
            <EmptyArchive />
          )}
          <GoBack
            position={"top-0 left-10"}
            path={"/admin/dashboard/project-requests"}
          />
          <Outlet context={archivedProjects} />
        </>
      )}
    </div>
  );
}

function Archive({ archivedRequests }) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      {archivedRequests.map((project) => (
        <Project key={project._id} project={project} />
      ))}
    </div>
  );
}

function Project({ project }) {
  return (
    <Link to={`${project?._id}`} className="w-[85%]">
      <div className=" my-4 flex w-full flex-row items-center justify-center gap-3 rounded border border-dashed border-blue-500 p-3 font-poppins shadow ">
        <img src={`/empty-archive-icon.png`} className="w-[15%] opacity-85" />
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex w-[100%] flex-row items-center justify-center gap-3 ">
            <h2 className="text-gray-800">{project?.name.toUpperCase()}</h2>
            <span>|</span>
            <span className="text-gray-500">{project?.company}</span>
          </div>
          <div className="flex w-full flex-row items-center justify-around text-sm">
            <span className="text-gray-500">
              {format(project?.createdAt, "dd MMM'. de' yyyy", {
                locale: ptBR,
              })}
            </span>
            <span>&middot;</span>
            <span className="italic text-red-500">
              {project.isArchived ? "Arquivado" : project.isAnswered}
            </span>
          </div>
        </div>
        <img src="/more-icon.png" className="w-[2%]" />
      </div>
    </Link>
  );
}

function EmptyArchive() {
  return (
    <div className="centerDivAbsolute absolute flex w-full flex-col items-center justify-center gap-4">
      <img
        src="/empty-archive-icon.png"
        className="w-[45%] opacity-90 drop-shadow-xl"
      />
      <h2 className="mt-6 text-lg text-gray-800">
        Ainda não há projetos arquivados...
      </h2>
      <p className="text-center text-gray-500">
        Finalize um projeto para arquivá-lo.
      </p>
    </div>
  );
}

export default ProjectRequestsArchive;
