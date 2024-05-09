import { Link, useSearchParams } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import Loader from "../Utils/Loader";
import Error from "../Utils/Error";
import Gophers from "../Utils/Gophers";
import ReadLater from "../Utils/ReadLater";

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

function Codice({ codice }) {
  return (
    <Link to={`/admin/dashboard/codice/${codice._id}`}>
      <div className="flex h-[200px] w-full flex-col items-center justify-center overflow-hidden p-4">
        <h2 className="border-b border-b-gray-400 pb-1 font-poppins font-bold text-gray-800">
          {codice.title}
        </h2>
        <div className="mt-2 flex flex-row items-center justify-center gap-5">
          <div className="flex w-[60%] flex-col items-center justify-center gap-4">
            <p className="mt-2 line-clamp-5 w-full font-noto text-xs text-gray-600">
              {codice.summary}
            </p>
            <div className="flex w-full flex-row items-center justify-center font-poppins text-xs text-gray-800">
              <Gophers />
              <ReadLater />
            </div>
          </div>
          <div className="flex w-[40%] flex-col items-center justify-center gap-3 rounded">
            <img src={`/${codice.cover}`} className="rounded shadow-lg" />
            <div className="flex flex-row items-center justify-around">
              <p className="font-noto text-sm text-gray-600">
                {new Date(codice.date).toLocaleDateString()}
              </p>
              <img
                src={`/${codice.author.photo}`}
                className="w-[30%] rounded-full border border-orange-500"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CodiceFilters;
