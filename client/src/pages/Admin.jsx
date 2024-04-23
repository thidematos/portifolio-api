import LoginAdmin from '../components/LoginAdmin';
import RouterModal from './../components/RouterModal';

function Admin() {
  return (
    <RouterModal path="/codice-desvelado">
      <LoginAdmin />
    </RouterModal>
  );
}

export default Admin;
