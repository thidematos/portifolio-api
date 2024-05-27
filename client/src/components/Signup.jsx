import { createContext, useContext, useState } from "react";
import Logo from "../Utils/Logo";
import TestUploader from "./../Utils/TestUploader";
import Footer from "./Footer";
import validator from "validator";
import Button from "../Utils/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./../Utils/Loader";
import Error from "./../Utils/Error";

const SignupContext = createContext();

function Signup() {
  const [signup, setSignup] = useState({
    email: {
      value: "",
      validator: (value) => validator.isEmail(value),
      status: false,
    },
    name: {
      value: "",
      validator: (value) =>
        validator.isAlpha(value, "pt-BR", {
          ignore: " ",
        }),
      status: false,
    },
    password: {
      value: "",
      validator: (value) =>
        !validator.contains(value, "$") &&
        validator.isStrongPassword(value, {
          minSymbols: 0,
        })
          ? true
          : false,
      status: false,
    },
    confirmPassword: {
      value: "",
      validator: (value, password) => validator.equals(value, password),
      status: false,
    },
    photo: null,
    mailNewPosts: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function createForm() {
    if (
      !signup.name.status ||
      !signup.password.status ||
      !signup.confirmPassword.status ||
      !signup.email.status
    )
      return;

    const form = new FormData();

    form.append("name", signup.name.value);
    form.append("email", signup.email.value);
    form.append("password", signup.password.value);
    form.append("passwordConfirm", signup.confirmPassword.value);
    form.append("photo", signup.photo);
    form.append("mailNewPosts", signup.mailNewPosts);

    return form;
  }

  async function handleSignup() {
    const form = createForm();
    try {
      setIsLoading(true);
      await axios.post("/api/v1/users/signup", form);
      navigate("/codice-desvelado/read");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SignupContext.Provider
      value={{
        signup,
        setSignup,
      }}
    >
      <div className="flex min-h-[100svh] w-full flex-col items-center justify-start gap-10 bg-gray-100">
        <Header />
        {isLoading && <Loader margin="my-10" />}
        {!isLoading && (
          <>
            <Input
              label={"Nome"}
              type={"text"}
              placeholder={"Thiago Luiz de Matos"}
              field={"name"}
            />
            <Input
              label={"Email"}
              type={"text"}
              placeholder={"thiago@gmail.com"}
              field={"email"}
            />
            <Input
              label={"Senha"}
              type={"password"}
              placeholder={"*******"}
              field={"password"}
            />
            <Input
              label={"Confirmação da senha"}
              type={"password"}
              placeholder={"*******"}
              field={"confirmPassword"}
            />
            <PasswordRequirements />
            <PhotoUploader />
            <ReceiveNewPosts />
            {signup.name.status &&
            signup.email.status &&
            signup.password.status &&
            signup.confirmPassword.status ? (
              <Button
                fontSize={"text-xl"}
                margin={"my-4"}
                type="action"
                onAction={() => handleSignup()}
              >
                Junte-se!
              </Button>
            ) : (
              <p className="py-3 font-poppins text-sm text-red-500">
                Preencha todo o formulário!
              </p>
            )}
          </>
        )}
        {error && <SubmitError error={error} />}

        <Footer
          padding={"py-6"}
          textColor={"text-gray-500"}
          fontSize={"text-sm"}
        />
      </div>
    </SignupContext.Provider>
  );
}

function SubmitError({ error }) {
  return <p className="font-poppins text-gray-800">{error}</p>;
}

function ReceiveNewPosts() {
  const { signup, setSignup } = useContext(SignupContext);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <p className="font-poppins text-gray-800">
        Deseja receber novos Códices?
      </p>
      <div className="flex flex-row items-center justify-center gap-3">
        <div
          className={`size-[25px] rounded-full border border-orange-500 ${signup.mailNewPosts ? "bg-green-300" : "bg-gray-50"} `}
          onClick={() =>
            setSignup((state) => {
              return {
                ...state,
                mailNewPosts: !state.mailNewPosts,
              };
            })
          }
        ></div>
        <label className={`font-poppins text-lg text-gray-500`}>
          {signup.mailNewPosts ? "Sim" : "Não"}
        </label>
      </div>
    </div>
  );
}

function PhotoUploader() {
  const [imageBlob, setImageBlob] = useState("");

  const { setSignup } = useContext(SignupContext);

  function createBlobUrl(file) {
    if (imageBlob) window.URL.revokeObjectURL(imageBlob);

    setSignup((state) => {
      return {
        ...state,
        photo: file,
      };
    });

    return window.URL.createObjectURL(file);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <h3 className="font-poppins text-lg text-gray-800 drop-shadow-sm">
        FOTO (opcional)
      </h3>

      <input
        type="file"
        id="photo"
        className="hidden"
        onChange={(e) => setImageBlob(createBlobUrl(e.target.files[0]))}
        multiple={false}
      />
      <label
        style={{ padding: imageBlob ? "" : "0px 10px" }}
        className=" flex size-[200px] flex-col items-center justify-center overflow-hidden rounded-full  border border-dashed border-blue-500 bg-gray-50 bg-center text-center font-poppins text-sm text-gray-400 shadow"
        htmlFor="photo"
        onDrop={(e) => {
          e.preventDefault();
          setImageBlob(createBlobUrl(e.dataTransfer.files[0]));
        }}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
      >
        {imageBlob ? (
          <img src={imageBlob} className="h-full rounded-full" />
        ) : (
          "Clique para adicionar sua foto"
        )}
      </label>
    </div>
  );
}

function PasswordRequirements() {
  const { signup } = useContext(SignupContext);

  const hasLength = validator.isLength(signup.password.value, { min: 8 });

  const hasUpper =
    [...signup.password.value].filter(
      (el) => validator.isUppercase(el) && !validator.isNumeric(el),
    ).length > 0;

  const hasNumber =
    [...signup.password.value].filter((el) => validator.isNumeric(el)).length >
    0;

  const isEqual =
    validator.equals(signup.password.value, signup.confirmPassword.value) &&
    !validator.isEmpty(signup.password.value);

  return (
    <ul className="text-poppins list-disc tracking-wider text-gray-500">
      <li className={`${hasLength ? "text-green-500" : ""}`}>
        Mais de 8 caracteres
      </li>
      <li className={`${hasUpper ? "text-green-500" : ""}`}>
        Uma letra maiúscula
      </li>
      <li className={`${hasNumber ? "text-green-500" : ""}`}>Um número</li>
      <li className={`${isEqual ? "text-green-500" : ""}`}>
        As senhas devem ser iguais
      </li>
    </ul>
  );
}

function Header() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <img src="/man-above.jpeg" className="rounded-b-lg shadow" />
      <div className="flex w-full flex-col items-center justify-center">
        <Logo width="w-[85%]" />
        <p className="font-poppins text-lg text-gray-800 drop-shadow-sm">
          Junte-se ao Códice Desvelado!
        </p>
      </div>
    </div>
  );
}

function Input({ label, type, placeholder, field }) {
  const { signup, setSignup } = useContext(SignupContext);

  return (
    <div className="flex w-full flex-col items-start justify-center gap-1 px-12 font-poppins text-gray-800">
      <label
        className={`${signup[field].status ? "text-blue-500" : "text-gray-800"} text-lg drop-shadow-sm`}
        htmlFor={field}
      >
        {label?.toUpperCase()}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={signup[field].value}
        id={field}
        onChange={(e) =>
          setSignup((state) => {
            return {
              ...state,
              [`${field}`]: {
                value: e.target.value,
                validator: state[field].validator,
                status: state[field].validator(
                  e.target.value,
                  state.password.value,
                ),
              },
            };
          })
        }
        className={`${
          signup[field].status ? "border-blue-500" : "border-gray-300"
        } w-full rounded border p-2   shadow-sm outline-none placeholder:text-gray-300`}
      />
    </div>
  );
}

export default Signup;
