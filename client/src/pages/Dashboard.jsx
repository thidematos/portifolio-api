import useCredentials from '../hooks/useCredentials';
import RouterModal from '../components/RouterModal';
import Error from '../components/Error';
import Loader from '../components/Loader';
import Logo from '../components/Logo';
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
    <>
      {isLoading && <Loader position={'absolute centerDivAbsolute'} />}
      {!isLoading && !error && (
        //Pode ser que eu faça um swiper com os PreviewDashboard. Depois, viria um gráfico com n. de users, likes, best post...
        <DashMainContainer>
          <NavDashboard user={user} />
          <div className="mt-16"></div>
          <Outlet />
          <div className="mb-16"></div>
          <Footer
            bgColor={'bg-transparent'}
            fontSize={
              'text-sm md:text-base lg:text-xs xl:text-sm 3xl:text-base'
            }
            textColor={'text-gray-500'}
            position={'absolute bottom-6'}
          />
        </DashMainContainer>
      )}
    </>
  );
}

function DashMainContainer({ children }) {
  return (
    <div className="w-full bg-gray-100 min-h-svh flex flex-col justify-start items-center relative gap-10">
      {children}
    </div>
  );
}

function NavDashboard({ user }) {
  return (
    <div className="w-full px-5 py-4 z-[999] bg-gray-100/75 flex flex-row justify-between items-center fixed ">
      <Logo fontSize={'text-4xl'} />
      <img
        src={`/${user.photo}`}
        className="rounded-full w-[20%] bg-inherit border-2 border-orange-400 shadow-xl"
      ></img>
    </div>
  );
}

export default Dashboard;
