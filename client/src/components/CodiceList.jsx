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

function CodiceList() {
  const [headerSize, setHeaderSize] = useState("");

  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

  const [user, setUser] = useVerifyUser();

  return (
    <div className="relative min-h-[100svh] w-full">
      <CodiceHeader
        headerSize={headerSize}
        setHeaderSize={setHeaderSize}
        user={user}
      />
      <CategoriesList currentCategory={currentCategory} />
      <CodicesFiltered currentCategory={currentCategory} />
      <Outlet context={{ setUser }} />
      <Footer
        position={"absolute bottom-0"}
        padding={"py-4"}
        textColor={"text-gray-500"}
        fontSize={"text-sm"}
      />
    </div>
  );
}

function CategoriesList({ currentCategory }) {
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
    <div className="flex w-full flex-row flex-nowrap overflow-x-scroll  ">
      {isLoading && <Loader size={50} margin="mt-2" />}

      {!isLoading && (
        <>
          <Category
            category={"+Gophed"}
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
        </>
      )}
    </div>
  );
}

function CodicesFiltered({ currentCategory }) {
  const [codices, setCodices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isTopGophed = currentCategory === "+gophed";

  useGet(
    setCodices,
    "codices",
    `/api/v1/codice${isTopGophed ? "/top-gophed" : ``}`,
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
          {filteredCodices.map((codice) => (
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
      )}
    </div>
  );
}

export default CodiceList;
