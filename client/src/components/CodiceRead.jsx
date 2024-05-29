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
import LoginModal from "../Utils/LoginModal";
import Footer from "./Footer";
import axios from "axios";
import CodiceSuggestions from "../Utils/CodiceSuggestions";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Loader from "../Utils/Loader";
import Error from "../Utils/Error";

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
    <div className="relative  w-full">
      <CodiceHeader
        setHeaderSize={setHeaderSize}
        headerSize={headerSize}
        user={user}
      />

      {isLoading && <Loader margin="my-20" />}
      {error && <Error />}
      {!isLoading && !error && (
        <>
          <div className="flex flex-col items-center justify-center p-6 md:px-12 md:py-20 lg:px-[15%] xl:px-[25%] 2xl:px-[28%] 2xl:py-12 3xl:px-[33%]">
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
              className={
                "my-6 rounded border-2 border-orange-500 shadow md:w-[85%] lg:w-full 3xl:w-[90%]"
              }
            />
            <Content content={codice?.content} />
          </div>

          <LoginModal
            setUser={setUser}
            isOpenModal={needLogin}
            onOpenModal={() => setNeedLogin(false)}
          />
          <Categories categories={codice?.category} />
          <Metrics
            gophers={numGophers}
            dependencies={{
              loginIsNeeded,
              setter: setUser,
              codiceId,
              isLiked: user?.gophed.includes(codiceId),
            }}
          />
          <ShareCodice codice={codice} />
          <CodiceSuggestions codice={codice} />
          <Footer
            padding={"py-8"}
            fontSize={"text-sm"}
            textColor={"text-gray-500"}
          />
          <Outlet context={{ setUser, path: -1 }} />
        </>
      )}
    </div>
  );
}

function ShareCodice({ codice }) {
  const url = window.location.href;

  return (
    <div className="my-6 flex w-full flex-col items-center justify-center gap-4 px-6">
      <p className="w-full text-center font-poppins text-lg text-gray-800 drop-shadow-sm lg:text-base 3xl:text-lg">
        Compartilhe esse Códice:
      </p>
      <div className="flex w-full flex-row items-center justify-around md:w-[60%] md:pt-4 lg:w-[50%] 2xl:w-[40%] 3xl:w-[30%]">
        <EmailShareButton
          url={url}
          subject={`Confira esse Códice: ${codice.title}`}
          body={`${codice.summary}`}
          separator=" Confira nesse link: "
        >
          <EmailIcon round={true} size={50} />
        </EmailShareButton>
        <FacebookShareButton hashtag="#codice" url={url}>
          <FacebookIcon round={true} size={50} />
        </FacebookShareButton>
        <LinkedinShareButton
          title={`Códice: ${codice.title}`}
          summary={`${codice.summary}`}
          source={`Thiago L. Matos - Códice Desvelado`}
          url={url}
        >
          <LinkedinIcon round={true} size={50} />
        </LinkedinShareButton>
        <WhatsappShareButton
          title={`Códice: ${codice.title}`}
          separator=" Confira nesse link: "
          url={url}
        >
          <WhatsappIcon round={true} size={50} />
        </WhatsappShareButton>
        <TwitterShareButton
          title={`Códice: ${codice.title}`}
          hashtag={["#codice"]}
          related={["@thivez_"]}
          url={url}
        >
          <TwitterIcon round={true} size={50} />
        </TwitterShareButton>
      </div>
    </div>
  );
}

function Content({ content }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
      className="tracking-wide xl:text-xl 2xl:text-lg"
    ></div>
  );
}

function Image({ img, className }) {
  return <img src={`/${img}`} className={className} />;
}

function Title({ title }) {
  return (
    <h1 className=" text-2xl font-bold text-gray-800 md:text-4xl lg:w-full lg:text-start">
      {title}
    </h1>
  );
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
  const { handler: handleToReadLater } = usePatch({
    resource: "user",
    field: "toReadLater",
    newValue: codiceId,
    setter: setter,
    usePath: "/api/v1/users",
  });

  return (
    <div className="relative my-3 flex w-full flex-row items-center justify-start gap-6  text-sm text-gray-500 md:my-6 md:text-base lg:text-sm xl:text-base 2xl:text-sm">
      <img
        src={`/${author?.photo}`}
        className="w-[15%] rounded-full border border-orange-400 shadow md:w-[10%] lg:w-[8%] xl:w-[12%] 2xl:w-[8%]"
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
        width={"w-[12%] md:w-[7%] xl:w-[10%] 2xl:w-[7%]"}
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
  const { handler: handleGopher } = usePatch({
    resource: "user",
    field: "gophed",
    newValue: dependencies.codiceId,
    setter: dependencies.setter,
    usePath: "/api/v1/users",
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-6">
      <p className="w-full text-center font-poppins text-lg text-gray-800 drop-shadow-sm lg:text-base xl:text-lg">
        Gostou? Deixe seu <span className="italic text-blue-500">Gopher</span>!
      </p>
      <div className="flex w-full flex-row items-center justify-center gap-3">
        <Gophers
          gophers={gophers}
          isLikeGopher={{
            width:
              "w-[20%] md:w-[10%] lg:w-[5%] xl:w-[8%] 2xl:w-[5%] 3xl:w-[4%]",
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
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-row flex-wrap items-center justify-center gap-3 rounded   px-4 py-8 md:px-12 lg:w-[60%] 3xl:w-[45%]">
        {categories?.map((category) => (
          <button
            key={category}
            className="w-[30%] rounded-xl bg-gray-500 p-1 text-sm text-gray-50 shadow md:w-[20%] xl:text-base 2xl:text-sm"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CodiceRead;
