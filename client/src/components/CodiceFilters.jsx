import { Link, useSearchParams } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import Loader from "../Utils/Loader";
import Error from "../Utils/Error";

import Codice from "../Utils/Codice";

function CodiceFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");

  const {
    data: codices,
    setData: setCodice,
    isLoading,
    error,
  } = useGetData(
    `/api/v1/codice?category=${category.replace(
      category.at(0),
      category.at(0).toUpperCase(),
    )}`,
  );

  return (
    <>
      {isLoading && (
        <div className="relative flex w-full grow flex-col items-center justify-center">
          <Loader position={"absolute centerDivAbsolute"} size={100} />
        </div>
      )}
      {error && <Error path={-1} message={error} />}
      {!isLoading && !error && (
        <div className="flex h-full w-full flex-col items-center justify-start">
          {codices.map((codice) => (
            <Codice codice={codice} key={codice._id} />
          ))}
        </div>
      )}
    </>
  );
}

export default CodiceFilters;
