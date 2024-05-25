import { createContext, useContext, useState } from "react";
import Logo from "../Utils/Logo";
import TestUploader from "./../Utils/TestUploader";
import Footer from "./Footer";
import validator from "validator";

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
        !validator.contains(value, "$") && validator.isStrongPassword(value)
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
    interests: [],
  });

  return (
    <SignupContext.Provider
      value={{
        signup,
        setSignup,
      }}
    >
      <div className="flex min-h-[100svh] w-full flex-col items-center justify-start gap-10 bg-gray-100">
        <Header />
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
        <TestUploader
          multiple={false}
          guide={"Escolha uma foto para seu perfil!"}
        />
        <Interests />
        <Footer
          padding={"py-6"}
          textColor={"text-gray-500"}
          fontSize={"text-sm"}
        />
      </div>
    </SignupContext.Provider>
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
        className={`${signup[field].status ? "text-green-500" : "text-gray-800"} text-lg drop-shadow-sm`}
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
          signup[field].status ? "border-green-500" : "border-gray-300"
        } w-full rounded border p-2   shadow-sm outline-none placeholder:text-gray-300`}
      />
    </div>
  );
}

function Interests() {
  return <div>Esses são meus interesses!</div>;
}

export default Signup;
