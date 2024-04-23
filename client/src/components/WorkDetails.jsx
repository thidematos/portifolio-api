import { Outlet, useParams } from 'react-router-dom';
import Loader from './Loader';
import Error from './Error';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function WorkDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [work, setWork] = useState({});

  useEffect(() => {
    const getWork = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`http://127.0.0.1:3000/api/v1/works/${id}`);

        setWork(res.data.data.work);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };
    getWork();
  }, [id]);

  return (
    <div className="w-full">
      {isLoading && <Loader />}
      {error && <Error message={error} />}
      {!isLoading && !error && (
        <>
          <Outlet context={[work, setWork]} />
          <Container>
            <Details />
            <EditArea>
              <Title
                fieldName={'Título'}
                title={work.title}
                fontColor={'text-gray-700'}
                fontSize={'text-lg'}
                toUpperCase={true}
                content={'title'}
              />
              <Title
                fieldName={'Sub-título'}
                title={work.subTitle}
                fontColor={'text-gray-700'}
                fontSize={'text-lg'}
                toUpperCase={true}
                content={'subTitle'}
              />
              <Image src={work.src} fieldName={'Capa'} content={'src'} />
            </EditArea>
          </Container>
        </>
      )}
    </div>
  );
}

function Container({ children }) {
  return (
    <div className="w-full py-6 flex flex-col justify-start items-center ">
      {children}
    </div>
  );
}

function Image({ src, fieldName, content }) {
  return (
    <Link to={`editar-img?field=${content}`}>
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <Field>{fieldName}</Field>
        <img src={`/${src}`} alt="" className="w-full" />
      </div>
    </Link>
  );
}

function EditArea({ children }) {
  return (
    <div className="py-10 w-full flex flex-col justify-center items-center gap-8">
      {children}
    </div>
  );
}

function Details() {
  return (
    <h5 className="w-full font-poppins text-center text-gray-400">
      Clique em alguma das opções para editar
    </h5>
  );
}

function Title({
  title,
  fontSize,
  fontColor,
  padding,
  margin,
  width,
  toUpperCase = false,
  content,
  fieldName,
}) {
  return (
    <Link to={`editar?field=${content}`} className="w-full">
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <Field>{fieldName}</Field>
        <h2
          className={`font-poppins ${fontColor} ${fontSize} ${padding} ${margin} ${width} drop-shadow text-center hover:text-blue-500 underline underline-offset-2 `}
        >
          🔧 {toUpperCase ? title?.toUpperCase() : title}
        </h2>
      </div>
    </Link>
  );
}

function Field({ children }) {
  return (
    <p className="font-poppins text-xl w-[60%] text-gray-100 text-center px-6 py-3 bg-blue-500">
      {children}
    </p>
  );
}

export default WorkDetails;
