import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import axios from "axios";
import Loader from "../Utils/Loader";
import { useSearchParams } from "react-router-dom";
import Category from "./../Utils/Category";

function CodiceDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get("category");

  const navigate = useNavigate();

  const [categories, setCategories] = useState({
    categories: [],
    isLoading: false,
    error: "",
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        setCategories((state) => {
          return {
            ...state,
            isLoading: true,
          };
        });
        const res = await axios.get("/api/v1/codice/categories");

        const mappedCategories = [
          ...new Set(
            res.data.data.categories.flatMap((category) => category.category),
          ),
        ];

        setCategories((state) => {
          return {
            ...state,
            categories: mappedCategories,
          };
        });

        navigate(`at?category=${mappedCategories.at(0).toLowerCase()}`);
      } catch (err) {
        setCategories((state) => {
          return {
            ...state,
            error: err.response.data.message,
          };
        });
      } finally {
        setCategories((state) => {
          return {
            ...state,
            isLoading: false,
          };
        });
      }
    };
    getCategories();
  }, []);

  return (
    <div className=" relative flex h-full w-full grow">
      <div className=" flex w-full grow flex-col items-center justify-start">
        <div className=" relative flex min-h-[12%] w-full grow flex-row flex-nowrap items-center justify-start overflow-x-scroll ">
          {categories.isLoading && (
            <Loader size={30} position={"absolute centerDivAbsolute"} />
          )}
          {!categories.isLoading &&
            categories.categories.map((category) => (
              <Category
                category={category}
                key={category}
                currentCategory={currentCategory}
              />
            ))}
        </div>
        <Outlet />
      </div>
      <Link to={"write"}>
        <img
          src="/write.png"
          className="fixed bottom-[10%] right-6 w-[15%] rounded-full bg-blue-500 p-1 shadow-lg drop-shadow"
        />
      </Link>
    </div>
  );
}

export default CodiceDashboard;
