import { useState } from "react";
import useGet from "../hooks/useGet";
import { Link } from "react-router-dom";
import GoBack from "../Utils/GoBack";
import FloatingButton from "../Utils/FloatingButton";

const initFilters = [
  {
    label: "Não lidos",
    query: "isAnswered",
    filter: "false",
    index: 0,
  },
  {
    label: "Lidos",
    query: "isAnswered",
    filter: "true",
    index: 1,
  },
  {
    label: "500 - 1k",
    query: "budget",
    filter: "R$500 - 1k",
    index: 2,
  },
  {
    label: "1k - 1.5k",
    query: "budget",
    filter: "R$1k - 1.5k",
    index: 3,
  },
  {
    label: "1.5k - 2k",
    query: "budget",
    filter: "R$1.5k - 2k",
    index: 4,
  },
];

function ProjectRequests() {
  const [filters, setFilters] = useState(initFilters);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [projectRequests, setProjectRequests] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredProjects = projectRequests?.filter(
    (project) =>
      String(project[filters[selectedFilter].query]) ===
      filters[selectedFilter].filter,
  );

  const currentProject = projectRequests?.find(
    (project) => project.currentProject === true,
  );

  useGet(
    setProjectRequests,
    "projectRequests",
    `/api/v1/project-requests?isArchived=false`,
    true,
    setIsLoading,
    setError,
  );

  return (
    <div className=" relative flex w-full grow flex-col items-center justify-start">
      <GoBack position={"top-0 left-5"} path={"/admin/dashboard"} />
      <h1 className="my-2 font-poppins text-xl text-gray-800">
        PEDIDOS DE PROJETOS
      </h1>
      {currentProject ? (
        <CurrentProject projectRequest={currentProject} />
      ) : (
        <p className="my-4 font-poppins text-sm text-gray-400">
          Nenhum projeto ativo no momento!
        </p>
      )}

      <div className="relative flex min-w-full flex-row flex-nowrap items-center justify-start overflow-x-scroll px-3">
        {filters.map((filter) => (
          <Filter
            key={filter.index}
            filter={filter}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          >
            {filter.label}
          </Filter>
        ))}
      </div>
      <div className="relative flex w-full grow flex-col items-center justify-start">
        {!filteredProjects?.length > 0 && <NotFound />}
        {filteredProjects?.map((project) => (
          <CurrentProject key={project._id} projectRequest={project} />
        ))}
      </div>
      <FloatingButton
        icon={"archive-white-icon.png"}
        padding={"p-4"}
        size={"size-[70px]"}
        bgColor={"bg-blue-500"}
        position={"bottom-3 right-6"}
        path={"archive"}
      />
    </div>
  );
}

function CurrentProject({ projectRequest }) {
  const createdAtDate = new Date(projectRequest?.createdAt).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );

  return (
    <Link to={`${projectRequest?._id}`} className="w-[85%]">
      <div className=" my-4 flex w-full flex-row items-center justify-center gap-3 rounded border border-dashed border-blue-500 p-3 font-poppins shadow ">
        <img
          src={`${projectRequest?.currentProject ? "/work-icon.png" : "/iddle-work.png"}`}
          className="w-[20%] opacity-85"
        />
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex w-[100%] flex-row items-center justify-center gap-3 ">
            <h2 className="text-gray-800">
              {projectRequest?.name.toUpperCase()}
            </h2>
            <span>|</span>
            <span className="text-gray-500">{projectRequest?.company}</span>
          </div>
          <div className="flex w-full flex-row  items-center justify-around">
            <span className="text-gray-500">{createdAtDate}</span>
            <span>&middot;</span>
            <span
              className={`${
                projectRequest?.isAnswered
                  ? "text-blue-500"
                  : "italic text-red-600"
              } `}
            >
              {projectRequest?.isAnswered ? "Lido" : "Não lido"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Filter({ children, filter, selectedFilter, setSelectedFilter }) {
  return (
    <button
      className={`h-full min-w-[25%] py-6 text-center font-poppins text-base duration-150 ${
        selectedFilter === filter.index
          ? "-translate-y-2 text-blue-500 underline underline-offset-8"
          : "text-gray-700"
      }`}
      onClick={() => {
        if (selectedFilter === filter.index) return;
        setSelectedFilter(filter.index);
      }}
    >
      {children}
    </button>
  );
}

function NotFound() {
  return (
    <p className="  centerDivAbsolute absolute w-full text-center font-poppins text-lg text-gray-400">
      Ainda não há Pedidos de Projeto!
    </p>
  );
}

export default ProjectRequests;
