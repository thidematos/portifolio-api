import useCredentials from "../hooks/useCredentials";
import RouterModal from "../Utils/RouterModal";
import Error from "../Utils/Error";
import Loader from "../Utils/Loader";
import Logo from "../Utils/Logo";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Dashboard() {
  const { isLoading, error, user } = useCredentials();

  if (error)
    return (
      <RouterModal path={"/codice-desvelado"}>
        <Error message={error} path={"/codice-desvelado"} />
      </RouterModal>
    );

  return (
    <div className="relative flex min-h-[100svh] w-screen bg-gray-100">
      {isLoading && <Loader position={"absolute centerDivAbsolute"} />}
      {!isLoading && !error && (
        //Pode ser que eu faça um swiper com os PreviewDashboard. Depois, viria um gráfico com n. de users, likes, best post...
        <DashMainContainer>
          <NavDashboard user={user} />
          <div className="mt-24"></div>
          <Outlet />
        </DashMainContainer>
      )}
      <Footer
        bgColor={"bg-gray-100"}
        fontSize={"text-sm md:text-base lg:text-xs xl:text-sm 3xl:text-base"}
        textColor={"text-gray-500"}
        padding={"py-6"}
        position={"absolute bottom-0"}
      />
    </div>
  );
}

function DashMainContainer({ children }) {
  return (
    <div className="relative mb-20 flex min-h-full w-full grow flex-col items-center justify-between">
      {children}
    </div>
  );
}

function NavDashboard({ user }) {
  return (
    <div className="fixed z-[999] flex w-full flex-row items-center justify-between bg-gray-100/75 px-5 py-4 ">
      <Logo fontSize={"text-3xl"} path="/admin/dashboard" />

      <img
        src={`/${user.photo}`}
        className="w-[15%] rounded-full border-2 border-orange-400 bg-inherit shadow-xl"
      ></img>
    </div>
  );
}

export default Dashboard;
