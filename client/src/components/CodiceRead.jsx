import { Outlet, useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import { useState } from "react";
import CodiceHeader from "../Utils/CodiceHeader";
import useVerifyUser from "../hooks/useVerifyUser";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ReadTime from "./../Utils/ReadTime";
import DOMPurify from "dompurify";
import Gophers from "../Utils/Gophers";
import ReadLater from "../Utils/ReadLater";
import usePatch from "./../hooks/usePatch";

function CodiceRead() {
  const { codiceId } = useParams();
  const [codice, setCodice] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [headerSize, setHeaderSize] = useState(0);
  const [user, setUser] = useVerifyUser();

  const readTime = new ReadTime().calcReadTime(codice.content);

  useGet(
    setCodice,
    "codice",
    `/api/v1/codice/${codiceId}`,
    false,
    setIsLoading,
    setError,
  );

  return (
    <div className="w-full">
      <CodiceHeader
        setHeaderSize={setHeaderSize}
        headerSize={headerSize}
        user={user}
      />

      <div className="p-6">
        <Title title={codice?.title} />
        <Header
          author={codice?.author}
          date={codice?.date}
          readTime={readTime}
          isToReadLater={user?.toReadLater?.includes(codiceId)}
          setter={setUser}
          codiceId={codiceId}
        />
        <Image
          img={codice?.cover}
          className={"my-6 rounded border-2 border-orange-500 shadow"}
        />
        <Content content={codice?.content} />
      </div>

      <Metrics gophers={codice?.likes?.length} />
      <Categories categories={codice?.category} />

      <Outlet context={{ setUser, path: -1 }} />
    </div>
  );
}

function Content({ content }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
      className="tracking-wide"
    ></div>
  );
}

function Image({ img, className }) {
  return <img src={`/${img}`} className={className} />;
}

function Title({ title }) {
  return <h1 className=" text-2xl font-bold text-gray-800">{title}</h1>;
}

function Header({ author, date, readTime, isToReadLater, setter, codiceId }) {
  const {
    handler: handleToReadLater,
    isLoading,
    error,
  } = usePatch({
    resource: "user",
    field: "toReadLater",
    newValue: codiceId,
    setter: setter,
    usePath: "/api/v1/users",
  });

  return (
    <div className="relative my-3 flex w-full flex-row items-center justify-start gap-6  text-sm text-gray-500">
      <img
        src={`/${author?.photo}`}
        className="w-[15%] rounded-full border border-orange-400 shadow"
      />
      <div className="flex flex-col items-start justify-center">
        <div className="flex w-full flex-row items-center justify-between gap-3">
          <p>{author?.name}</p>
          <span>&middot;</span>
          <p>
            {date ? format(date, "dd MMM'. ' yyyy", { locale: ptBR }) : ""}.
          </p>
        </div>

        <p>{readTime} min. de leitura.</p>
      </div>
      <ReadLater
        position={"absolute right-0"}
        showCount={false}
        width={"w-[12%]"}
        isToReadLater={isToReadLater}
        action={() => handleToReadLater()}
      />
    </div>
  );
}

function Metrics({ gophers, readLaters }) {
  return (
    <div className="flex w-full flex-row items-center justify-center">
      <Gophers gophers={gophers} />

      <ReadLater readLater={readLaters} />
    </div>
  );
}

function Categories({ categories }) {
  return (
    <div className=" flex w-full flex-row flex-wrap items-center justify-start gap-3 rounded  px-4 py-8 ">
      {categories?.map((category) => (
        <button
          key={category}
          className="w-[30%] rounded-xl bg-gray-500 p-1 text-sm text-gray-50 shadow"
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CodiceRead;
