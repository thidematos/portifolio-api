import { Link } from "react-router-dom";
import Gophers from "./Gophers";
import ReadLater from "./ReadLater";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function Codice({ codice, path = "/admin/dashboard/codice" }) {
  return (
    <Link
      to={`${path}/${codice._id}`}
      className="flex w-full flex-col items-center justify-center "
    >
      <div className=" flex h-[220px] w-full flex-col items-center justify-center overflow-hidden border-b border-gray-200 px-4 md:mt-10 md:h-[200px] md:w-[90%] md:px-0 lg:mt-6 lg:h-[150px] lg:pb-6 xl:px-10 2xl:h-[200px] 3xl:px-6">
        <h2 className=" pb-1 font-poppins font-bold text-gray-800 md:hidden">
          {codice.title}
        </h2>
        <div className="mt-2 flex flex-row items-center justify-center gap-5 md:w-full md:gap-1 ">
          <div className="flex w-[60%] flex-col items-center justify-center gap-4  md:gap-3 md:pl-12 lg:w-[70%] 2xl:w-[60%]">
            <h2 className=" hidden font-poppins font-bold text-gray-800 md:block md:text-lg lg:self-start lg:text-sm xl:text-lg 2xl:text-xl 3xl:text-2xl">
              {codice.title}
            </h2>
            <p className="mt-2 line-clamp-4 w-full font-noto text-xs text-gray-600 md:mt-0 md:text-sm  lg:text-xs xl:line-clamp-3 xl:text-sm 2xl:line-clamp-3 3xl:text-base">
              {codice.summary}
            </p>
            <div className="flex w-full flex-row items-center justify-center gap-2 font-poppins text-xs text-gray-800">
              <p className="hidden font-noto text-sm text-gray-600 md:mr-12 md:block lg:text-xs xl:text-sm">
                {format(codice.date, "dd MMM'.' yyyy", { locale: ptBR })}
              </p>
              <Gophers
                isLikeGopher={{
                  onGopher: () => null,
                  width: "w-[10%] lg:w-[8%]",
                }}
              />

              {codice.numLikes > 0 ? (
                <p className="lg:text-xs xl:text-sm">
                  <span className="italic text-blue-500">Gophed</span> por{" "}
                  <span className="font-noto">{codice.numLikes}</span> leitores
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
              className="rounded shadow-lg md:w-[80%] lg:w-[70%] xl:w-[65%]"
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
