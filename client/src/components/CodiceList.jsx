import { useEffect, useState } from "react";
import CodiceHeader from "../Utils/CodiceHeader";
import useGet from "../hooks/useGet";
import Category from "../Utils/Category";
import { Outlet, useSearchParams } from "react-router-dom";
import Loader from "../Utils/Loader";
import Error from "../Utils/Error";
import Codice from "../Utils/Codice";
import Footer from "./Footer";
import axios from "axios";
import useVerifyUser from "../hooks/useVerifyUser";
import Music from "../Utils/Music";

function CodiceList() {
  const [headerSize, setHeaderSize] = useState("");

  const [searchParams] = useSearchParams();
  let currentCategory = searchParams.get("category");

  if (currentCategory?.trim() === "gophed") currentCategory = "most-gophed";

  const [user, setUser] = useVerifyUser();

  const isMediumSize = window.innerWidth <= 768;

  return (
    <div className="relative min-h-[100svh] w-full bg-gray-50 lg:flex lg:flex-row lg:items-center lg:justify-center">
      <div className="categoriesScroll relative h-[100svh] w-full overflow-x-hidden  overflow-y-scroll lg:w-[65%] 2xl:w-[70%]">
        <CodiceHeader
          headerSize={headerSize}
          setHeaderSize={setHeaderSize}
          user={user}
        />
        <CategoriesList
          isMediumSize={isMediumSize}
          currentCategory={currentCategory}
          user={user}
        />
        <CodicesFiltered currentCategory={currentCategory} user={user}>
          {isMediumSize && <MusicIcon user={user} setUser={setUser} />}
        </CodicesFiltered>
        <Outlet context={{ setUser, path: "/codice-desvelado/read" }} />
      </div>
      <div className="relative hidden lg:block lg:w-[35%] 2xl:w-[30%] 3xl:mr-[10%]">
        <MusicOfTheDay user={user} setUser={setUser} />
      </div>
    </div>
  );
}

function MusicIcon({ user, setUser }) {
  const [isShow, setIsShow] = useState(false);

  return (
    <div
      className={`${isShow ? "translate-x-0" : " translate-x-[100%]"} absolute right-0 z-10 w-[80%] origin-right bg-gray-50 py-5 duration-200 md:w-[50%]`}
    >
      <div
        className={`absolute right-[100%] top-0 flex w-[20%] flex-row  justify-center rounded-l-xl  bg-blue-400 py-2 shadow lg:hidden`}
        onClick={() => setIsShow((state) => !state)}
      >
        <img src="/radio-icon.png" className="w-[35%]" />
      </div>
      <MusicOfTheDay user={user} setUser={setUser} isMobile={true} />
    </div>
  );
}

function MusicOfTheDay({ user, setUser }) {
  const [musics, setMusics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useGet(setMusics, "musics", "/api/v1/musics", false, setIsLoading, setError);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <Music
          user={user}
          setMusic={setMusics}
          setUser={setUser}
          music={musics.at(0)}
        />
      )}
    </>
  );
}

function CategoriesList({ currentCategory, user, isMediumSize }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useGet(
    setCategories,
    "categories",
    "/api/v1/codice/categories",
    false,
    setIsLoading,
    setError,
  );

  const eachCategory = [
    ...new Set(categories.flatMap((codice) => codice.category)),
  ];

  return (
    <div className="categoriesScroll flex w-full flex-row flex-nowrap overflow-x-scroll  3xl:ml-[15%] 3xl:mr-0 3xl:w-auto">
      {isLoading && <Loader size={50} margin="mt-2" />}

      {!isLoading && (
        <>
          <Category
            category={"+ Gophed"}
            path=""
            currentCategory={currentCategory}
          />

          {eachCategory.map((category) => (
            <Category
              category={category}
              key={category}
              currentCategory={currentCategory}
              path=""
            />
          ))}
          {user && (
            <Category
              category={"Salvos"}
              path=""
              currentCategory={currentCategory}
            />
          )}
        </>
      )}
    </div>
  );
}

function CodicesFiltered({ currentCategory, user, children }) {
  const [codices, setCodices] = useState([]);
  const [userReadLaters, setUserReadLaters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isTopGophed = currentCategory === "most-gophed";

  useEffect(() => {
    if (!user && currentCategory !== "salvos") return;

    const getUserReadLaters = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/v1/users/read-laters", {
          withCredentials: true,
        });
        setUserReadLaters(res.data.data.codices);
      } catch (err) {
        console.log(err);
        setError(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUserReadLaters();
  }, [user, currentCategory]);

  useGet(
    setCodices,
    "codices",
    `/api/v1/codice${isTopGophed ? "?sort=-numLikes" : ``}`,
    false,
    setIsLoading,
    setError,
  );

  const filteredCodices = codices.filter((codice) => {
    const iterationCategories = codice.category.map((category) =>
      category.toLowerCase(),
    );

    return iterationCategories.includes(currentCategory);
  });

  return (
    <div className=" relative flex w-full flex-col  items-center justify-center   pt-6 md:pt-0 3xl:ml-[15%] 3xl:w-auto">
      {children}
      {isLoading && (
        <Loader position={"absolute centerDivAbsolute"} size={100} />
      )}
      {error && <Error path={"/codice-desvelado"} message={error} />}
      {!isLoading && !error && (
        <>
          {currentCategory !== "salvos" ? (
            <>
              {filteredCodices.map((codice) => (
                <Codice
                  codice={codice}
                  key={codice._id}
                  path={`/codice-desvelado/read`}
                />
              ))}

              {!filteredCodices.length &&
                codices.map((codice) => (
                  <Codice
                    codice={codice}
                    key={codice._id}
                    path={`/codice-desvelado/read`}
                  />
                ))}
              {filteredCodices.length < 4 && (
                <p className="py-16 font-poppins text-lg text-gray-800 drop-shadow lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl">
                  Mais Códices em breve...
                </p>
              )}
            </>
          ) : (
            <>
              {userReadLaters.map((codice) => (
                <Codice
                  codice={codice}
                  key={codice._id}
                  path={`/codice-desvelado/read`}
                />
              ))}
              {!userReadLaters.length && (
                <p className="h-[380px] w-[85%] py-16 text-center font-poppins text-gray-400 drop-shadow">
                  Nenhum Códice salvo para ler depois...
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default CodiceList;
