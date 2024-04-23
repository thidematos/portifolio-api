import { Link } from 'react-router-dom';

function DashboardOverview() {
  return (
    <>
      <PreviewDashboard
        to={'/admin/dashboard/works'}
        title={'Projetos'}
        img={'mern-2.1'}
      />
      <PreviewDashboard
        to={'/admin/dashboard/works'}
        title={'Pedidos'}
        img={'mern-3.1'}
      />
      <PreviewDashboard
        to={'/admin/dashboard/works'}
        title={'Códice'}
        img={'mern-4.1'}
      />
      <PreviewDashboard
        to={'/admin/dashboard/works'}
        title={'Reviews'}
        img={'mern-5.1'}
      />
    </>
  );
}

function PreviewDashboard({ to, title, img }) {
  return (
    <Link to={to}>
      <div className="w-full rounded-lg shadow-lg relative">
        <div className={`w-full rounded-lg`}>
          <img
            src={`/${img}.png`}
            className="w-full rounded-lg opacity-55 brightness-75"
          ></img>
        </div>
        <h1 className="w-[60%] text-center font-poppins text-blue-500 text-3xl drop-shadow-xl bg-gray-200 px-6 py-4 rounded-lg shadow-lg absolute centerDivAbsolute tracking-wider">
          {title}
        </h1>
      </div>
    </Link>
  );
}

export default DashboardOverview;
