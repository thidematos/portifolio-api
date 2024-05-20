import { useParams } from "react-router-dom";

function CodiceRead() {
  const { codiceId } = useParams();

  return <div>{codiceId}</div>;
}

export default CodiceRead;
