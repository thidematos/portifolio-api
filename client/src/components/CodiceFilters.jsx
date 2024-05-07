import { Link, useSearchParams } from 'react-router-dom';
import useGetData from '../hooks/useGetData';
import Loader from '../Utils/Loader';
import Error from '../Utils/Error';
import Gophers from '../Utils/Gophers';
import ReadLater from '../Utils/ReadLater';

function CodiceFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category');

  const {
    data: codices,
    setData: setCodice,
    isLoading,
    error,
  } = useGetData(
    `/api/v1/codice?category=${category.replace(
      category.at(0),
      category.at(0).toUpperCase()
    )}`
  );

  return (
    <>
      {isLoading && (
        <div className="flex flex-col justify-center items-center h-[90svh] w-full relative">
          <Loader position={'absolute centerDivAbsolute'} size={100} />
        </div>
      )}
      {error && <Error path={-1} message={error} />}
      {!isLoading && !error && (
        <div className="w-full min-h-full flex flex-col justify-center items-center">
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
      <div className="h-[200px] w-full flex flex-col justify-center items-center overflow-hidden p-4 mt-4">
        <h2 className="font-poppins text-gray-800 font-bold pb-1 border-b border-b-gray-400">
          {codice.title}
        </h2>
        <div className="flex flex-row justify-center items-center mt-2 gap-5">
          <div className="w-[60%] flex flex-col justify-center items-center gap-4">
            <p className="text-xs font-noto line-clamp-5 text-gray-600 mt-2 w-full">
              {codice.summary}
            </p>
            <div className="flex flex-row justify-center items-center w-full font-poppins text-xs text-gray-800">
              <Gophers />
              <ReadLater />
            </div>
          </div>
          <div className="w-[40%] rounded flex flex-col justify-center items-center gap-3">
            <img src={`/${codice.cover}`} className="rounded shadow-lg" />
            <div className="flex flex-row justify-around items-center">
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
