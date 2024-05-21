import { Outlet, useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import Gophers from "../Utils/Gophers";
import ReadLater from "../Utils/ReadLater";
import Loader from "../Utils/Loader";
import Error from "../Utils/Error";
import { Link } from "react-router-dom";
import ReadTime from "./../Utils/ReadTime";

function CodiceDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { codiceId } = useParams();
  const [codice, setCodice] = useState(null);

  const readTime = new ReadTime().calcReadTime(codice?.content);

  useGet(
    setCodice,
    "codice",
    `/api/v1/codice/${codiceId}`,
    false,
    setIsLoading,
    setError,
  );

  return (
    <div className="mb-20 flex w-full flex-col items-center justify-center px-6 font-poppins">
      <Outlet context={[codice, setCodice]} />
      {isLoading && <Loader />}
      {error && <Error />}
      {!isLoading && !error && (
        <>
          <Title title={codice?.title} />
          <Header
            author={codice?.author}
            date={codice?.date}
            readTime={readTime}
          />
          <Image
            img={codice?.cover}
            className={"my-6 rounded border-2 border-orange-500 shadow"}
          />
          <Content content={codice?.content} />
          <Categories categories={codice?.category} />
          <Metrics
            gophers={codice?.likes?.length}
            readLaters={codice?.toReadLater?.length}
          />
        </>
      )}
    </div>
  );
}

function Title({ title }) {
  return (
    <Link to={"edit?field=title"}>
      <h1 className=" text-xl font-bold text-gray-800 underline underline-offset-4">
        {title}
      </h1>
    </Link>
  );
}

function Header({ author, date, readTime }) {
  return (
    <div className="my-3 flex w-full flex-row items-center justify-start gap-6 text-sm text-gray-500">
      <img
        src={`/${author?.photo}`}
        className="w-[15%] rounded-full border border-orange-400 shadow"
      />
      <div className="flex flex-col items-start justify-center">
        <div className="flex w-full flex-row items-center justify-between gap-3">
          <p>{author?.name}</p>
          <span>&middot;</span>
          <p>
            {new Date(date).toLocaleDateString("pt-BR", {
              month: "short",
              year: "numeric",
            })}
            .
          </p>
        </div>

        <p> {readTime} min. de leitura.</p>
      </div>
    </div>
  );
}

function Image({ img, className }) {
  return (
    <Link to={"editImage?field=cover"}>
      <img src={`/${img}`} className={className} />
    </Link>
  );
}

function Content({ content }) {
  return (
    <>
      <Link to={"editContent?field=content"}>
        <button className="mb-6 rounded bg-blue-500 px-5 py-3 text-gray-50 shadow-lg drop-shadow">
          🔧 Editar conteúdo
        </button>
      </Link>

      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
        className="tracking-wide"
      ></div>
    </>
  );
}

function Categories({ categories }) {
  return (
    <Link to={"editCategory"} className="w-full">
      <div className="my-10 flex w-full flex-row flex-wrap items-center justify-start gap-3 rounded border border-orange-500 bg-gray-200 px-4 py-8 shadow">
        {categories?.map((category) => (
          <button
            key={category}
            className="w-[30%] rounded-xl bg-gray-500 p-1 text-sm text-gray-50 shadow"
          >
            {category}
          </button>
        ))}
      </div>
    </Link>
  );
}

function Metrics({ gophers, readLaters }) {
  return (
    <div className="flex w-full flex-row items-center justify-center">
      <Link to={""}>
        <Gophers gophers={gophers} />
      </Link>

      <ReadLater readLater={readLaters} />
    </div>
  );
}

export default CodiceDetails;
