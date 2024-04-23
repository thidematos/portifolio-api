import { Link, Outlet } from 'react-router-dom';

function CodiceDesvelado() {
  return (
    <div>
      <h1>oi</h1>
      <Link to="/" className="font-bold text-red-800 text-3xl">
        VOLTAR
      </Link>
      <Link to="admin" className="font-bold text-orange-500 text-3xl">
        ADMIN
      </Link>
      <Outlet />
    </div>
  );
}

export default CodiceDesvelado;
