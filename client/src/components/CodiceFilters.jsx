import { useSearchParams } from 'react-router-dom';
import useGetData from '../hooks/useGetData';

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
    <div className="w-full h-full flex flex-col justify-items-center items-center">
      <h1>Resultados: {codices.length}</h1>
      {codices.map((codice) => (
        <Codice codice={codice} key={codice._id} />
      ))}
    </div>
  );
}

function Codice({ codice }) {
  return (
    <div className="h-[200px] w-full flex flex-col justify-center items-center overflow-hidden p-4">
      <h2 className="font-poppins text-gray-800 font-bold pb-1 border-b border-b-gray-400">
        {codice.title}
      </h2>
      <div className="flex flex-row justify-center items-center mt-2 gap-5">
        <div className="w-[60%] flex flex-col justify-center items-center gap-2">
          <p className="text-xs font-noto line-clamp-5 text-gray-600 mt-2 w-full">
            {codice.summary}
          </p>
          <div className="flex flex-row justify-center items-center w-full font-poppins text-xs text-gray-800">
            <div className="flex flex-row justify-center items-center gap-1 ">
              <img
                src="/gopher-like.png"
                className="rounded-full w-[30%]  grayscale-[50%]"
              />
              <span>155</span>
            </div>
            <div className="flex flex-row justify-center items-center gap-1 ">
              <img
                src="/bookmark-active.png"
                className="rounded-full w-[30%]"
              />
              <span>36</span>
            </div>
          </div>
        </div>
        <img src={`/${codice.cover}`} className="w-[40%] rounded shadow-lg" />
      </div>
    </div>
  );
}

export default CodiceFilters;
