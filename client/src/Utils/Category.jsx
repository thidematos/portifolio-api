import { Link } from "react-router-dom";

function Category({ category, currentCategory, path = "at" }) {
  return (
    <Link
      to={`${path}?category=${category.toLowerCase()}`}
      className={"min-w-[30%]"}
    >
      <button
        className={`h-full w-full py-6 text-center font-poppins text-base duration-150 ${
          category?.toLowerCase() === currentCategory
            ? "-translate-y-2 text-blue-500 underline underline-offset-8"
            : "text-gray-700"
        }`}
      >
        {category}
      </button>
    </Link>
  );
}

export default Category;
