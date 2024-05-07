import { Outlet, useParams } from 'react-router-dom';
import useGet from '../hooks/useGet';
import { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import Gophers from '../Utils/Gophers';
import ReadLater from '../Utils/ReadLater';
import Loader from '../Utils/Loader';
import Error from '../Utils/Error';
import { Link } from 'react-router-dom';
import countWords from '../Utils/CountWords';
import Button from '../Utils/Button';

function CodiceDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { codiceId } = useParams();
  const [codice, setCodice] = useState(null);
  const [numWords, setNumWords] = useState(0);

  useGet(
    setCodice,
    'codice',
    `/api/v1/codice/${codiceId}`,
    false,
    setIsLoading,
    setError
  );

  return (
    <div className="w-full flex flex-col justify-center items-center font-poppins px-6">
      <Outlet context={[codice, setCodice]} />
      {isLoading && <Loader />}
      {error && <Error />}
      {!isLoading && !error && (
        <>
          <Title title={codice?.title} />
          <Header
            author={codice?.author}
            date={codice?.date}
            numWords={numWords}
          />
          <Image
            img={codice?.cover}
            className={'rounded shadow my-6 border-2 border-orange-500'}
          />
          <Content content={codice?.content} setNumWords={setNumWords} />
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
    <Link to={'edit?field=title'}>
      <h1 className=" text-gray-800 text-xl font-bold underline underline-offset-4">
        {title}
      </h1>
    </Link>
  );
}

function Header({ author, date, numWords }) {
  const averageReadSpeed = 130;

  return (
    <div className="flex flex-row justify-start items-center w-full text-gray-500 gap-6 my-3 text-sm">
      <img
        src={`/${author?.photo}`}
        className="rounded-full w-[15%] border border-orange-400 shadow"
      />
      <div className="flex flex-col justify-center items-start">
        <div className="flex flex-row justify-between items-center w-full gap-3">
          <p>{author?.name}</p>
          <span>&middot;</span>
          <p>
            {new Date(date).toLocaleDateString('pt-BR', {
              month: 'short',
              year: 'numeric',
            })}
            .
          </p>
        </div>

        <p> {Math.round(numWords / averageReadSpeed)} min. de leitura.</p>
      </div>
    </div>
  );
}

function Image({ img, className }) {
  return (
    <Link to={'editImage?field=cover'}>
      <img src={`/${img}`} className={className} />
    </Link>
  );
}

function Content({ content, setNumWords }) {
  const contentDiv = useRef(null);

  useEffect(() => {
    if (contentDiv.current) setNumWords(countWords(contentDiv.current));
  }, [contentDiv.current]);

  return (
    <>
      <Link to={'editContent?field=content'}>
        <button className="bg-blue-500 px-5 py-3 rounded text-gray-50 mb-6 shadow-lg drop-shadow">
          🔧 Editar conteúdo
        </button>
      </Link>

      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
        ref={contentDiv}
        className="tracking-wide"
      ></div>
    </>
  );
}

function Categories({ categories }) {
  return (
    <Link to={'editCategory'} className="w-full">
      <div className="my-10 flex flex-row justify-start items-center flex-wrap w-full gap-3 border border-orange-500 py-8 px-4 rounded shadow bg-gray-200">
        {categories?.map((category) => (
          <button
            key={category}
            className="w-[30%] bg-gray-500 p-1 text-gray-50 rounded-xl text-sm shadow"
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
    <div className="flex flex-row justify-center items-center w-full">
      <Gophers gophers={gophers} />
      <ReadLater readLater={readLaters} />
    </div>
  );
}

export default CodiceDetails;
