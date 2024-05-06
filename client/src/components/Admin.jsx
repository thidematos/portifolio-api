import LoginAdmin from './LoginAdmin';
import RouterModal from '../Utils/RouterModal';

function Admin() {
  return (
    <RouterModal path="/codice-desvelado">
      <LoginAdmin />
    </RouterModal>
  );
}

export default Admin;
