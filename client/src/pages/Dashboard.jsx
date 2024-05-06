import useCredentials from '../hooks/useCredentials';
import RouterModal from '../Utils/RouterModal';
import Error from '../Utils/Error';
import Loader from '../Utils/Loader';
import Logo from '../Utils/Logo';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

function Dashboard() {
  const { isLoading, error, user } = useCredentials();

  if (error)
    return (
      <RouterModal path={'/codice-desvelado'}>
        <Error message={error} path={'/codice-desvelado'} />
      </RouterModal>
    );

  return (
    <div className="w-full min-h-[100svh] bg-gray-100">
      {isLoading && <Loader position={'absolute centerDivAbsolute'} />}
      {!isLoading && !error && (
        //Pode ser que eu faça um swiper com os PreviewDashboard. Depois, viria um gráfico com n. de users, likes, best post...
        <DashMainContainer>
          <NavDashboard user={user} />
          <div className="mt-24"></div>
          <Outlet />

          <Footer
            bgColor={'bg-gray-100'}
            fontSize={
              'text-sm md:text-base lg:text-xs xl:text-sm 3xl:text-base'
            }
            textColor={'text-gray-500'}
            padding={'py-6'}
          />
        </DashMainContainer>
      )}
    </div>
  );
}

function DashMainContainer({ children }) {
  return (
    <div className="w-full  h-full flex flex-col justify-between items-center relative">
      {children}
    </div>
  );
}

function NavDashboard({ user }) {
  return (
    <div className="w-full px-5 py-4 z-[999] bg-gray-100/75 flex flex-row justify-between items-center fixed ">
      <Logo fontSize={'text-3xl'} />
      <img
        src={`/${user.photo}`}
        className="rounded-full w-[15%] bg-inherit border-2 border-orange-400 shadow-xl"
      ></img>
    </div>
  );
}

export default Dashboard;
