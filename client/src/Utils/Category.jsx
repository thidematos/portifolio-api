import { Link } from "react-router-dom";

function Category({ category, currentCategory, path = "at" }) {
  const mappedCategory = category === "+ Gophed" ? "most-gophed" : category;

  return (
    <Link
      to={`${path}?category=${category.toLowerCase()}`}
      className={"min-w-[30%] md:min-w-[20%] lg:w-[10%]"}
    >
      <button
        className={`h-full w-full py-6 text-center font-poppins text-base duration-150 lg:text-xs xl:text-sm 3xl:text-base ${
          mappedCategory?.toLowerCase() === currentCategory
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
