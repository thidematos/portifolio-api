import LoginAdmin from './LoginAdmin';
import RouterModal from './RouterModal';

function Admin() {
  return (
    <RouterModal path="/codice-desvelado">
      <LoginAdmin />
    </RouterModal>
  );
}

export default Admin;
