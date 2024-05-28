import { Link } from "react-router-dom";
import Gophers from "./Gophers";
import ReadLater from "./ReadLater";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function Codice({ codice, path = "/admin/dashboard/codice" }) {
  return (
    <Link
      to={`${path}/${codice._id}`}
      className="flex w-full flex-col items-center justify-center"
    >
      <div className=" flex h-[250px] w-full flex-col items-center justify-center overflow-hidden border-b border-gray-300 px-4 py-6 md:h-[200px] md:w-[90%] md:px-0">
        <h2 className=" pb-1 font-poppins font-bold text-gray-800 md:hidden">
          {codice.title}
        </h2>
        <div className="mt-2 flex flex-row items-center justify-center gap-5 md:w-full md:gap-1 ">
          <div className="flex w-[60%] flex-col items-center justify-center gap-4  md:gap-3 md:pl-12">
            <h2 className=" hidden font-poppins font-bold text-gray-800 md:block md:text-lg">
              {codice.title}
            </h2>
            <p className="mt-2 line-clamp-4 w-full font-noto text-xs text-gray-600 md:mt-0 md:text-sm  ">
              {codice.summary}
            </p>
            <div className="flex w-full flex-row items-center justify-center gap-2 font-poppins text-xs text-gray-800">
              <p className="hidden font-noto text-sm text-gray-600 md:mr-12 md:block">
                {format(codice.date, "dd MMM'.' yyyy", { locale: ptBR })}
              </p>
              <Gophers
                isLikeGopher={{ onGopher: () => null, width: "w-[10%]" }}
              />

              {codice.numLikes > 0 ? (
                <p>
                  <span className="italic text-blue-500">Gophed</span> por{" "}
                  <span className="font-noto text-base ">
                    {codice.numLikes}
                  </span>{" "}
                  leitores
                </p>
              ) : (
                <p className="text-gray-800">
                  Nenhum <span className="italic text-blue-500">Gopher</span>
                </p>
              )}
            </div>
          </div>
          <div className="flex w-[40%] flex-col items-center justify-center gap-4 rounded ">
            <img
              src={`/${codice.cover}`}
              className="rounded shadow-lg md:w-[80%]"
            />
            <div className="flex flex-row items-center justify-around md:hidden">
              <p className="font-noto text-sm text-gray-600 ">
                {format(codice.date, "dd MMM'.' yyyy", { locale: ptBR })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Codice;
