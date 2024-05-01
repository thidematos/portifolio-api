import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import useGetData from '../hooks/useGetData';
import axios from 'axios';
import Loader from './Loader';
import { useSearchParams } from 'react-router-dom';

function CodiceDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category');

  const navigate = useNavigate();

  const [categories, setCategories] = useState({
    categories: [],
    isLoading: false,
    error: '',
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
        const res = await axios.get('/api/v1/codice/categories');

        const mappedCategories = [
          ...new Set(
            res.data.data.categories.flatMap((category) => category.category)
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
    <div className="relative w-full h-full ">
      <div className="flex flex-col w-full justify-center items-center">
        <div className="w-full flex flex-row justify-start items-center flex-nowrap relative overflow-x-scroll ">
          {categories.isLoading && (
            <Loader size={30} position={'absolute centerDivAbsolute'} />
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
      <Link to={'write'}>
        <img
          src="/write.png"
          className="bg-blue-500 p-1 rounded-full w-[15%] shadow-lg drop-shadow fixed right-6 bottom-[10%]"
        />
      </Link>
    </div>
  );
}

function Category({ category, currentCategory }) {
  return (
    <Link
      to={`at?category=${category.toLowerCase()}`}
      className={'min-w-[30%]'}
    >
      <button
        className={`w-full h-full py-6 font-poppins text-base text-center duration-150 ${
          category?.toLowerCase() === currentCategory
            ? 'text-blue-500 -translate-y-2 underline underline-offset-8'
            : 'text-gray-700'
        }`}
      >
        {category}
      </button>
    </Link>
  );
}

export default CodiceDashboard;
