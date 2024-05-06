import { Outlet, useParams } from 'react-router-dom';
import Loader from '../Utils/Loader';
import Error from '../Utils/Error';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '../Utils/Button';

function WorkDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [work, setWork] = useState({});

  useEffect(() => {
    const getWork = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/v1/works/${id}`);

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
                fontSize={'text-base'}
                toUpperCase={true}
                content={'title'}
              />
              <Title
                fieldName={'Sub-título'}
                title={work.subTitle}
                fontColor={'text-gray-700'}
                fontSize={'text-base'}
                toUpperCase={true}
                content={'subTitle'}
              />
              <Image src={work.src} fieldName={'Capa'} content={'src'} />
              <Title
                fieldName={'Descrição'}
                title={work.description}
                fontColor={'text-gray-700'}
                fontSize={'text-sm'}
                toUpperCase={true}
                content={'description'}
                textAlign="text-left"
                width={'w-[90%]'}
                underline=""
              />
              <Image
                src={work.mainImg}
                fieldName={'Hero'}
                content={'mainImg'}
              />

              {work.sections?.map((section, ind) => (
                <div
                  key={ind + 1}
                  className={`${
                    (ind + 1) % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'
                  } w-full flex flex-col justify-center items-center gap-5`}
                >
                  <Field
                    fontSize="text-xl"
                    width="w-full"
                    isSection={section._id}
                    section={ind}
                  >
                    SEÇÃO - {ind + 1}
                  </Field>
                  <Title
                    fieldName={'Heading'}
                    title={section.title}
                    fontColor={'text-gray-700'}
                    fontSize={'text-base'}
                    toUpperCase={true}
                    content={`title`}
                    width={'w-[90%]'}
                    section={String(ind)}
                  />
                  <Title
                    fieldName={'Detalhes'}
                    title={section.description}
                    fontColor={'text-gray-700'}
                    fontSize={'text-sm'}
                    toUpperCase={true}
                    content={`description`}
                    textAlign="text-left"
                    width={'w-[90%]'}
                    underline=""
                    section={String(ind)}
                  />
                  <Image
                    src={section.img}
                    fieldName={'Imagem'}
                    content={`img`}
                    section={String(ind)}
                  />
                </div>
              ))}
              <Field fontSize="text-xl" width="w-full">
                PRODUÇÃO
              </Field>
              <Title
                fieldName={'Ano'}
                title={work.year}
                fontColor={'text-gray-700'}
                fontSize={'text-lg'}
                toUpperCase={true}
                content={`year`}
                textAlign="text-center"
                width={'w-[90%]'}
              />
              <Title
                fieldName={'Habilidades'}
                title={work.abilities}
                fontColor={'text-gray-700'}
                fontSize={'text-sm'}
                toUpperCase={true}
                content={`abilities`}
                textAlign="text-left"
                width={'w-[90%]'}
              />
              <Title
                fieldName={'Deploy'}
                title={work.link}
                fontColor={'text-gray-700'}
                fontSize={'text-base'}
                toUpperCase={true}
                content={`link`}
                textAlign="text-center"
                width={'w-[90%]'}
                underline="underline"
              />
              <Color colors={work.colors} />
              <Image
                fieldWidth={'w-[100%]'}
                src={work.projectLogo}
                fieldName={'Logo do projeto'}
                content={`projectLogo`}
              />
            </EditArea>
            <div className="w-full flex flex-row justify-around items-center">
              <Button
                fontSize={'text-2xl'}
                bgColor="bg-orange-500"
                type="back"
                path={'/admin/dashboard/works'}
              >
                VOLTAR
              </Button>
              <Button
                fontSize={'text-xl'}
                bgColor="bg-gray-300"
                type="back"
                path={'delete'}
              >
                🗑️
              </Button>
            </div>
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

function Image({ src, fieldName, content, section = '', fieldWidth }) {
  return (
    <Link
      to={`editar-img?field=${content}${
        section !== '' ? `&section=${section}` : ''
      }`}
    >
      <div className="w-full flex flex-col justify-center items-center py-8 border-b border-gray-400 gap-6">
        <Field width={fieldWidth}>{fieldName}</Field>
        <img src={`/${src}`} alt="" className="w-full" />
      </div>
    </Link>
  );
}

function EditArea({ children }) {
  return (
    <div className="pb-10 w-full flex flex-col justify-center items-center ">
      {children}
    </div>
  );
}

function Color({ colors }) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5 py-8 border-b border-gray-400">
      <Field>Cores</Field>
      <Link className="w-full" to={`colors`}>
        <div className="flex flex-col justify-center items-center w-full">
          <p className="font-poppins text-lg text-gray-400">
            Clique para alterar o gradiente
          </p>
          <div
            style={{
              backgroundImage: `linear-gradient(to right, ${colors?.from}, ${colors?.to})`,
            }}
            className={`h-[100px] w-full `}
          ></div>
        </div>
      </Link>
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
  underline = '',
  textAlign = 'text-center',
  section = '',
}) {
  return (
    <Link
      to={`editar?field=${content}${
        section !== '' ? `&section=${section}` : ''
      }`}
      className="w-full"
    >
      <div className="w-full flex flex-col justify-center items-center gap-6 border-b border-gray-400 py-8">
        <Field>{fieldName}</Field>
        <h2
          className={`font-poppins ${fontColor} ${fontSize} ${padding} ${margin} ${width} drop-shadow ${textAlign} hover:text-blue-500 ${underline} underline-offset-2 `}
        >
          🔧 {toUpperCase ? title?.toUpperCase() : title}
        </h2>
      </div>
    </Link>
  );
}

function Field({
  children,
  width = 'w-[40%]',
  fontSize = 'text-lg',
  bgColor = 'bg-blue-500/75',
  textColor = 'text-gray-100',
  isSection = false,
  section = '',
}) {
  return (
    <p
      className={`rounded font-poppins ${fontSize} ${width} ${textColor} text-center px-6 py-3 ${bgColor} relative `}
    >
      {isSection && (
        <Link to={`delete-section?id=${isSection}&section=${section}`}>
          <img
            src="/thrash-can.png"
            className="absolute h-[23px] w-[23px] left-[10%] "
          />
        </Link>
      )}
      {isSection && (
        <Link to={`add-section?section=${section}`}>
          <img
            src="/add.png"
            className=" absolute h-[26px] w-[26px] right-[10%]   "
          />
        </Link>
      )}
      {children}
    </p>
  );
}

export default WorkDetails;
