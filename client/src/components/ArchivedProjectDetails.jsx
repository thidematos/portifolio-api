import { useOutletContext, useParams } from "react-router-dom";
import RouterModal from "../Utils/RouterModal";

function ArchivedProjectDetails() {
  const projectId = useParams();
  const archivedProjects = useOutletContext();

  const project = archivedProjects.find((project) => projectId);

  console.log(project);
  return (
    <RouterModal>
      <h1>oioioioioi</h1>
    </RouterModal>
  );
}

export default ArchivedProjectDetails;
