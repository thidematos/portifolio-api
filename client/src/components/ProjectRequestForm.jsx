import { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Error from './Error';

function ProjectRequestForm() {
  const [started, setStarted] = useState(false);

  function startForm() {
    setStarted(true);
  }

  return <>{started ? <RequestForm /> : <GetStarted onStart={startForm} />}</>;
}

function GetStarted({ onStart }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center h-full w-full p-6 md:p-4 xl:p-8 relative  rounded-xl">
      <h1 className="font-poppins font-bold text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl text-gray-800">
        Vamos começar
      </h1>
      <div className="text-center md:text-left font-poppins text-gray-500 flex flex-col justify-center items-center text-xs md:text-sm lg:text-xs xl:text-sm 3xl:text-base mt-4">
        <h2>São questões prévias essenciais para o inicio de um projeto.</h2>
        <h3>Por favor, seja o mais claro possível.</h3>
      </div>
      <Button onAction={onStart} marginTop={'mt-6'}>
        Começar
      </Button>
      <p className="font-poppins text-gray-500 text-xs md:text-sm lg:text-xs 3xl:text-sm mt-4">
        Ou então, escreva para{' '}
        <a
          className={`${isHovered ? 'text-blue-500' : 'text-gray-500'}`}
          href="mailto:raizer50@gmail.com"
          onMouseEnter={() => setIsHovered((state) => !state)}
          onMouseOut={() => setIsHovered((state) => !state)}
        >
          raizer50@gmail.com
        </a>
      </p>
      <div className="flex flex-row justify-center items-baseline w-full gap-1 absolute bottom-10">
        <span className="text-xs md:text-sm lg:text-xs">ℹ️</span>
        <p className="font-poppins text-gray-500 text-xs md:text-sm lg:text-xs xl:text-sm 3xl:text-base ">
          Apenas projetos de desenvolvimento Web.
        </p>
      </div>
    </div>
  );
}

function RequestForm() {
  const [budget, setBudget] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitedRequest, setSubmitedRequest] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);

  const values = ['R$500 - 1k', 'R$1k - 1.5k', 'R$1.5k - 2k'];
  let formComplete = false;

  if (budget && name && email && position && company && description)
    formComplete = true;

  const states = [budget, name, email, position, company, description];

  const counter = states.reduce((acc, state) => (state ? acc + 1 : acc), 0);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/api/v1/project-requests',
        data: {
          name,
          email,
          position,
          company,
          budget: String(budget),
          description,
        },
      });
      setSubmitedRequest(res.data.data.projectRequest);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
      setIsSubmited(true);
    }
  }

  return (
    <>
      {!isLoading && !error && !isSubmited && (
        <form className="p-4 md:py-6 lg:py-4 xl:py-6 md:px-8 xl:px-10 2xl:p-8 3xl:p-8 flex flex-col rounded-xl justify-center md:justify-evenly lg:justify-center items-start h-full w-full bg-white">
          <InputContainer>
            <Label htmlFor={'name'}>Nome completo</Label>
            <Input
              type={'text'}
              id={'name'}
              placeholder={'Bill Gates'}
              onChange={setName}
              value={name}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor={'email'}>Email</Label>
            <Input
              type={'text'}
              id={'email'}
              placeholder={'bill@windows.com'}
              onChange={setEmail}
              value={email}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor={'position'}>Posição & Empresa</Label>
            <div className="flex flex-row justify-start gap-6 items-center w-full">
              <Input
                type={'text'}
                id={'position'}
                placeholder={'CEO'}
                onChange={setPosition}
                value={position}
              />
              <p className="font-poppins text-gray-700 md:text-base lg:text-sm xl:text-base 2xl:text-lg drop-shadow-sm">
                em
              </p>
              <Input
                type={'text'}
                id={'at'}
                placeholder={'Microsoft'}
                onChange={setCompany}
                value={company}
              />
            </div>
          </InputContainer>

          <InputContainer>
            <p className="font-poppins text-gray-700 text-base lg:text-sm 2xl:text-base 3xl:text-xl">
              Orçamento
            </p>
            <div className="flex flex-row justify-between items-center w-full my-3">
              {values.map((value, ind) => (
                <button
                  className={`labelBudget ${
                    budget === ind + 1 ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  key={ind + 1}
                  type="button"
                  onClick={() => setBudget(ind + 1)}
                >
                  {value}
                </button>
              ))}
            </div>
          </InputContainer>

          <InputContainer>
            <Label htmlFor={'project'}>Descrição do projeto</Label>
            <textarea
              id="project"
              className="h-[80px] md:h-[100px] lg:h-auto w-full my-3 bg-gray-100 p-3 font-poppins text-gray-700 resize-none border border-gray-300 rounded-lg shadow-sm text-xs md:text-sm lg:text-xs 2xl:text-sm 3xl:text-base"
              placeholder="Me conte mais sobre seu projeto. Inclua detalhes, objetivos, prazos e design. Adicione links, se houverem."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </InputContainer>

          {formComplete ? (
            <Button
              marginTop={'mt-3 lg:mt-0 xl:mt-3 3xl:mt-6'}
              onAction={handleSubmit}
            >
              Enviar projeto
            </Button>
          ) : (
            <ToCompleteBar counter={counter} />
          )}
        </form>
      )}
      {isLoading && <Loader />}
      {error && <Error message={error} />}
      {isSubmited && !error && (
        <ProjectRequestConfirmation submitedRequest={submitedRequest} />
      )}
    </>
  );
}

function ProjectRequestConfirmation({ submitedRequest }) {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-evenly items-center">
      <h6 className="font-poppins text-xl text-gray-800">PROJETO RECEBIDO!</h6>
      <ConfirmationField
        title={'Identificador'}
        value={submitedRequest._id}
        itemsPosition="items-center"
      />
      <ConfirmationField title={'NOME'} value={submitedRequest.name} />
      <ConfirmationField title={'EMAIL'} value={submitedRequest.email} />
      <ConfirmationField title={'POSIÇÃO'} value={submitedRequest.position} />
      <ConfirmationField title={'EMPRESA'} value={submitedRequest.company} />
      <ConfirmationField title={'ORÇAMENTO'} value={submitedRequest.budget} />
      <ConfirmationField
        title={'DESCRIÇÃO'}
        value={submitedRequest.description}
      />
    </div>
  );
}

function ConfirmationField({ title, value, itemsPosition = 'items-start' }) {
  return (
    <div
      className={`w-full flex flex-col justify-center ${itemsPosition} font-poppins`}
    >
      <p className="text-lg text-gray-500">{title}</p>
      <p className="text-base text-gray-800">{value}</p>
    </div>
  );
}

function Button({ children, onAction, marginTop }) {
  return (
    <button
      className={`${marginTop} w-full bg-blue-500 text-gray-50 font-poppins py-3 text-sm md:text-base lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl rounded-lg shadow-xl drop-shadow`}
      onClick={(e) => onAction(e)}
    >
      {children}
    </button>
  );
}

function Label({ htmlFor, children }) {
  return (
    <label
      className="font-poppins text-gray-700 text-base md:text-base 2xl:text-base 3xl:text-xl drop-shadow-sm"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

function Input({ type, placeholder, id, show = 'w-full', onChange, value }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className={`${show} p-3 rounded-lg shadow-sm my-3 lg:my-2 xl:my-3 bg-gray-100 text-gray-700 font-poppins tracking-wider border border-gray-300 text-xs md:text-sm lg:text-xs 2xl:text-sm 3xl:text-base`}
    ></input>
  );
}

function InputContainer({ children }) {
  return (
    <div className="flex flex-col justify-center items-start w-full">
      {children}
    </div>
  );
}

function ToCompleteBar({ counter }) {
  const completePercentage = [
    'w-[0%]',
    'w-[16.6%]',
    'w-[33.3%]',
    'w-[49.9%]',
    'w-[66.5%]',
    'w-[83.1%]',
    'w-[100%]',
  ];

  return (
    <div
      className={`relative w-full flex flex-row justify-start items-center mt-3 lg:mt-0 xl:mt-3 3xl:mt-6 rounded-lg border border-gray-300`}
    >
      <div
        className={`bg-blue-500 origin-left absolute ${completePercentage[counter]} duration-200 h-full rounded-l-lg opacity-85`}
      ></div>
      <p className="w-full text-gray-700 font-poppins py-3 text-sm md:text-base lg:text-sm xl:text-lg 3xl:text-xl rounded-lg  drop-shadow text-center">
        Por favor, preencha todo o formulário.
      </p>
    </div>
  );
}

export default ProjectRequestForm;
