import { Link, Outlet } from 'react-router-dom';

function CodiceDashboard() {
  return (
    <div className="relative w-full min-h-[70svh] markup">
      <Link to={'write'}>
        <img
          src="/write.png"
          className="bg-blue-500 p-1 rounded-full w-[15%] shadow-lg drop-shadow absolute right-4 bottom-0"
        />
      </Link>
    </div>
  );
}

export default CodiceDashboard;
