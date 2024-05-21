import { Outlet, useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import { useEffect, useState } from "react";
import CodiceHeader from "../Utils/CodiceHeader";
import useVerifyUser from "../hooks/useVerifyUser";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ReadTime from "./../Utils/ReadTime";
import DOMPurify from "dompurify";
import Gophers from "../Utils/Gophers";
import ReadLater from "../Utils/ReadLater";
import usePatch from "./../hooks/usePatch";
import LoginUser from "./LoginUser";
import LoginModal from "../Utils/LoginModal";
import Footer from "./Footer";
import axios from "axios";

function CodiceRead() {
  const { codiceId } = useParams();
  const [codice, setCodice] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [headerSize, setHeaderSize] = useState(0);
  const [user, setUser] = useVerifyUser();
  const [needLogin, setNeedLogin] = useState(false);
  const [numGophers, setNumGophers] = useState(0);

  const readTime = new ReadTime().calcReadTime(codice.content);

  useGet(
    setCodice,
    "codice",
    `/api/v1/codice/${codiceId}`,
    false,
    setIsLoading,
    setError,
  );

  useEffect(() => {
    const getGophers = async () => {
      try {
        const res = await axios.get(`/api/v1/codice/${codiceId}?fields=likes`);
        console.log(res);
        setNumGophers(res.data.data.codice.likes.length);
      } catch (err) {
        console.log(err);
      }
    };

    getGophers();
  }, [codiceId, user]);

  function loginIsNeeded() {
    if (!user) {
      setNeedLogin(true);
      return true;
    }

    return false;
  }

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
          loginIsNeeded={loginIsNeeded}
        />
        <Image
          img={codice?.cover}
          className={"my-6 rounded border-2 border-orange-500 shadow"}
        />
        <Content content={codice?.content} />
      </div>

      <LoginModal
        setUser={setUser}
        isOpenModal={needLogin}
        onOpenModal={() => setNeedLogin(false)}
      />

      <Metrics
        gophers={numGophers}
        dependencies={{
          loginIsNeeded,
          setter: setUser,
          codiceId,
          isLiked: user?.gophed.includes(codiceId),
        }}
      />
      <Categories categories={codice?.category} />
      <Footer
        padding={"py-8"}
        fontSize={"text-sm"}
        textColor={"text-gray-500"}
      />
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

function Header({
  author,
  date,
  readTime,
  isToReadLater,
  setter,
  codiceId,
  loginIsNeeded,
}) {
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
        action={() => {
          const isNeeded = loginIsNeeded();
          if (!isNeeded) handleToReadLater();
        }}
      />
    </div>
  );
}

function Metrics({ gophers, dependencies }) {
  const {
    handler: handleGopher,
    isLoading,
    error,
  } = usePatch({
    resource: "user",
    field: "gophed",
    newValue: dependencies.codiceId,
    setter: dependencies.setter,
    usePath: "/api/v1/users",
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-6">
      <p className="w-full text-center font-poppins text-gray-800 drop-shadow-sm">
        Gostou? Deixe seu <span className="italic text-blue-500">Gopher</span>{" "}
        para o autor!
      </p>
      <div className="flex w-full flex-row items-center justify-center gap-3">
        <Gophers
          gophers={gophers}
          isLikeGopher={{
            width: "w-[20%]",
            isLiked: dependencies.isLiked,
            onGopher: () => {
              const isNeeded = dependencies.loginIsNeeded();
              if (!isNeeded) handleGopher();
            },
          }}
        />
        <p className="font-poppins text-sm  text-gray-800 drop-shadow-sm">
          <span className="italic text-blue-500">Gophed</span> por{" "}
          <span className="text-lg">{gophers} </span>
          leitor{gophers > 1 ? "es" : ""}
        </p>
      </div>
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
