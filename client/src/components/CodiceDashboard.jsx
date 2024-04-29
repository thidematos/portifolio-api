import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useGetData from '../hooks/useGetData';

function CodiceDashboard() {
  const {
    data: codices,
    setData: setCodices,
    isLoading,
    error,
  } = useGetData('/api/v1/codice', true);

  console.log(codices);

  return (
    <div className="relative w-full h-full markup">
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
