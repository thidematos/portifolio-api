import { useOutletContext } from "react-router-dom";
import RouterModal from "../Utils/RouterModal";

function DeleteProjectRequest() {
  const { handleDelete } = useOutletContext();

  return (
    <RouterModal height="h-auto" closeTop="top-4" path={-1}>
      <div className="py-10">
        <h2>Tem certeza que deseja deletar esse pedido?</h2>
        <p>Essa ação não pode ser desfeita.</p>
      </div>
    </RouterModal>
  );
}

export default DeleteProjectRequest;
