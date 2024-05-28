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

  return (
    <div className="relative min-h-[100svh] w-full lg:flex lg:flex-row lg:items-center lg:justify-center">
      <div className="markup relative min-h-[100svh] w-full lg:w-[65%]">
        <CodiceHeader
          headerSize={headerSize}
          setHeaderSize={setHeaderSize}
          user={user}
        />
        <CategoriesList currentCategory={currentCategory} user={user} />
        <CodicesFiltered currentCategory={currentCategory} user={user} />
        <Outlet context={{ setUser, path: "/codice-desvelado/read" }} />
        <Footer
          position={"absolute bottom-0"}
          padding={"py-4"}
          textColor={"text-gray-500"}
          fontSize={"text-sm"}
        />
      </div>
      <div className="markup hidden grow lg:block lg:w-[35%]">
        <MusicOfTheDay />
      </div>
    </div>
  );
}

function MusicOfTheDay() {
  const [musics, setMusics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useGet(setMusics, "musics", "/api/v1/musics", false, setIsLoading, setError);

  return (
    <div className="w-full ">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Music music={musics.at(0)} />
        </>
      )}
    </div>
  );
}

function CategoriesList({ currentCategory, user }) {
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
    <div className="flex w-full flex-row flex-nowrap overflow-x-scroll ">
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

function CodicesFiltered({ currentCategory, user }) {
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
    <div className="flex w-full  flex-col items-center justify-center">
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
                <p className="py-16 font-poppins text-lg text-gray-800 drop-shadow">
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
                <p className="w-[85%] py-16 text-center font-poppins text-gray-400 drop-shadow">
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
