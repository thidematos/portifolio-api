import { Link } from "react-router-dom";

function DashboardOverview() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <PreviewDashboard
        to={"/admin/dashboard/works"}
        title={"Projetos"}
        img={"mern-2.1"}
      />
      <PreviewDashboard
        to={"/admin/dashboard/project-requests"}
        title={"Pedidos"}
        img={"mern-3.1"}
      />
      <PreviewDashboard
        to={"/admin/dashboard/codice"}
        title={"Códice"}
        img={"mern-4.1"}
      />
      <PreviewDashboard
        to={"/admin/dashboard/works"}
        title={"Reviews"}
        img={"mern-5.1"}
      />
    </div>
  );
}

function PreviewDashboard({ to, title, img }) {
  return (
    <Link to={to}>
      <div className="relative w-full rounded-lg shadow-lg">
        <div className={`w-full rounded-lg`}>
          <img
            src={`/${img}.png`}
            className="w-full rounded-lg opacity-55 brightness-75"
          ></img>
        </div>
        <h1 className="centerDivAbsolute absolute w-[60%] rounded-lg bg-gray-200 px-6 py-4 text-center font-poppins text-3xl tracking-wider text-blue-500 shadow-lg drop-shadow-xl">
          {title}
        </h1>
      </div>
    </Link>
  );
}

export default DashboardOverview;
