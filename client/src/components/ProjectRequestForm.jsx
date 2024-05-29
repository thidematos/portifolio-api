import { useState } from "react";
import axios from "axios";
import Loader from "../Utils/Loader";
import Error from "../Utils/Error";

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
    <div className="relative my-4 flex h-full w-full flex-col items-center justify-center rounded-xl p-6 md:p-4  xl:p-8">
      <h1 className="font-poppins text-xl font-bold text-gray-800 md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl">
        Vamos começar
      </h1>
      <div className="mt-4 flex flex-col items-center justify-center text-center font-poppins text-xs text-gray-500 md:text-left md:text-sm lg:text-xs xl:text-sm 3xl:text-base">
        <h2>São questões prévias essenciais para o inicio de um projeto.</h2>
        <h3>Por favor, seja o mais claro possível.</h3>
      </div>
      <Button onAction={onStart} marginTop={"mt-6"}>
        Começar
      </Button>
      <p className="mt-4 font-poppins text-xs text-gray-500 md:text-sm lg:text-xs 3xl:text-sm">
        Ou então, escreva para{" "}
        <a
          className={`${isHovered ? "text-blue-500" : "text-gray-500"}`}
          href="mailto:raizer50@gmail.com"
          onMouseEnter={() => setIsHovered((state) => !state)}
          onMouseOut={() => setIsHovered((state) => !state)}
        >
          raizer50@gmail.com
        </a>
      </p>
      <div className="absolute bottom-10 flex w-full flex-row items-baseline justify-center gap-1">
        <span className="text-xs md:text-sm lg:text-xs">ℹ️</span>
        <p className="font-poppins text-xs text-gray-500 md:text-sm lg:text-xs xl:text-sm 3xl:text-base ">
          Apenas projetos de desenvolvimento Web.
        </p>
      </div>
    </div>
  );
}

function RequestForm() {
  const [budget, setBudget] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitedRequest, setSubmitedRequest] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);

  const values = ["R$500 - 1k", "R$1k - 1.5k", "R$1.5k - 2k"];
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
        method: "post",
        url: "/api/v1/project-requests",
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
        <form className="flex h-full w-full flex-col items-start justify-center overflow-y-scroll rounded-xl bg-white p-4 md:justify-evenly md:px-8 md:py-6 lg:justify-center lg:py-4 xl:px-10 xl:py-6 2xl:p-8 3xl:p-8">
          <InputContainer>
            <Label htmlFor={"name"}>Nome completo</Label>
            <Input
              type={"text"}
              id={"name"}
              placeholder={"Bill Gates"}
              onChange={setName}
              value={name}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor={"email"}>Email</Label>
            <Input
              type={"text"}
              id={"email"}
              placeholder={"bill@windows.com"}
              onChange={setEmail}
              value={email}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor={"position"}>Posição & Empresa</Label>
            <div className="flex w-full flex-row items-center justify-start gap-6">
              <Input
                type={"text"}
                id={"position"}
                placeholder={"CEO"}
                onChange={setPosition}
                value={position}
              />
              <p className="font-poppins text-gray-700 drop-shadow-sm md:text-base lg:text-sm xl:text-base 2xl:text-lg">
                em
              </p>
              <Input
                type={"text"}
                id={"at"}
                placeholder={"Microsoft"}
                onChange={setCompany}
                value={company}
              />
            </div>
          </InputContainer>

          <InputContainer>
            <p className="font-poppins text-base text-gray-700 lg:text-sm 2xl:text-base 3xl:text-xl">
              Orçamento
            </p>
            <div className="my-3 flex w-full flex-row items-center justify-between">
              {values.map((value, ind) => (
                <button
                  className={`labelBudget ${
                    budget === ind + 1 ? "border-blue-500" : "border-gray-300"
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
            <Label htmlFor={"project"}>Descrição do projeto</Label>
            <textarea
              id="project"
              className="my-3 h-[80px] w-full resize-none rounded-lg border border-gray-300 bg-gray-100 p-3 font-poppins text-xs text-gray-700 shadow-sm md:h-[100px] md:text-sm lg:h-auto lg:text-xs 2xl:text-sm 3xl:text-base"
              placeholder="Me conte mais sobre seu projeto. Inclua detalhes, objetivos, prazos e design. Adicione links, se houverem."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </InputContainer>

          {formComplete ? (
            <Button
              marginTop={"mt-3 lg:mt-0 xl:mt-3 3xl:mt-6"}
              onAction={handleSubmit}
            >
              Enviar projeto
            </Button>
          ) : (
            <ToCompleteBar counter={counter} />
          )}
        </form>
      )}
      {isLoading && <Loader position={"absolute centerDivAbsolute"} />}
      {error && <Error message={error} />}
      {isSubmited && !error && (
        <ProjectRequestConfirmation submitedRequest={submitedRequest} />
      )}
    </>
  );
}

function ProjectRequestConfirmation({ submitedRequest }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly overflow-y-scroll p-6">
      <h6 className="font-poppins text-xl text-gray-800">PROJETO RECEBIDO!</h6>
      <ConfirmationField
        title={"Identificador"}
        value={submitedRequest._id}
        itemsPosition="items-center"
      />
      <ConfirmationField title={"NOME"} value={submitedRequest.name} />
      <ConfirmationField title={"EMAIL"} value={submitedRequest.email} />
      <ConfirmationField title={"POSIÇÃO"} value={submitedRequest.position} />
      <ConfirmationField title={"EMPRESA"} value={submitedRequest.company} />
      <ConfirmationField title={"ORÇAMENTO"} value={submitedRequest.budget} />
      <ConfirmationField
        title={"DESCRIÇÃO"}
        value={submitedRequest.description}
      />
    </div>
  );
}

function ConfirmationField({ title, value, itemsPosition = "items-start" }) {
  return (
    <div
      className={`flex w-full flex-col justify-center ${itemsPosition} font-poppins`}
    >
      <p className="text-lg text-gray-500">{title}</p>
      <p className="text-base text-gray-800">{value}</p>
    </div>
  );
}

function Button({ children, onAction, marginTop }) {
  return (
    <button
      className={`${marginTop} w-full rounded-lg bg-blue-500 py-3 font-poppins text-sm text-gray-50 shadow-xl drop-shadow md:text-base lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl`}
      onClick={(e) => onAction(e)}
    >
      {children}
    </button>
  );
}

function Label({ htmlFor, children }) {
  return (
    <label
      className="font-poppins text-base text-gray-700 drop-shadow-sm md:text-base 2xl:text-base 3xl:text-xl"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

function Input({ type, placeholder, id, show = "w-full", onChange, value }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className={`${show} my-3 rounded-lg border border-gray-300 bg-gray-100 p-3 font-poppins text-xs tracking-wider text-gray-700 shadow-sm md:text-sm lg:my-2 lg:text-xs xl:my-3 2xl:text-sm 3xl:text-base`}
    ></input>
  );
}

function InputContainer({ children }) {
  return (
    <div className="flex w-full flex-col items-start justify-center">
      {children}
    </div>
  );
}

function ToCompleteBar({ counter }) {
  const completePercentage = [
    "w-[0%]",
    "w-[16.6%]",
    "w-[33.3%]",
    "w-[49.9%]",
    "w-[66.5%]",
    "w-[83.1%]",
    "w-[100%]",
  ];

  return (
    <div
      className={`relative mt-3 flex w-full flex-row items-center justify-start rounded-lg border border-gray-300 lg:mt-0 xl:mt-3 3xl:mt-6`}
    >
      <div
        className={`absolute origin-left bg-blue-500 ${completePercentage[counter]} h-full rounded-l-lg opacity-85 duration-200`}
      ></div>
      <p className="w-full rounded-lg py-3 text-center font-poppins text-sm text-gray-700 drop-shadow md:text-base lg:text-sm  xl:text-lg 3xl:text-xl">
        Por favor, preencha todo o formulário.
      </p>
    </div>
  );
}

export default ProjectRequestForm;
