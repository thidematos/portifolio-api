import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import Loader from "../Utils/Loader";
import Error from "../Utils/Error";
import { useNavigate } from "react-router-dom";
import Button from "../Utils/Button";
import ErrorNotification from "./../Utils/ErrorNotification";

function LoginForm({ pathToAfterLogin }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = { email: user, password };

    try {
      setIsLoading(true);
      const data = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/login",
        credentials,
        {
          withCredentials: true,
        },
      );

      if (!data.statusText === "OK") {
        throw new Error("Falha em autenticar o usuário.");
      }

      navigate(pathToAfterLogin);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {!isLoading && (
        <form className="relative flex w-full flex-col items-center justify-center gap-3 p-8">
          <InputDiv
            type={"text"}
            label={"Usuário"}
            labelId={"user"}
            icon={"user"}
            placeholder="Astronauta!"
            state={user}
            setter={setUser}
          />
          <InputDiv
            type={"password"}
            label={"Senha"}
            labelId={"pwd"}
            icon={"pwd"}
            placeholder="*******"
            state={password}
            setter={setPassword}
          />
          <Button onAction={handleSubmit} margin={"mt-6"} fontSize={"text-2xl"}>
            LOGIN
          </Button>
        </form>
      )}
      {isLoading && <Loader width="w-[80%]" margin="mt-6" />}
      {error && (
        <ErrorNotification
          bgColor={"bg-orange-500"}
          fontSize={"text-lg"}
          toUpperCase={true}
          textColor={"text-gray-50"}
          position={"bottom-6"}
          width={"w-[80%]"}
          error={error}
          setError={setError}
        >
          {error}
        </ErrorNotification>
      )}
    </>
  );
}

function InputDiv({ type, label, labelId, icon, placeholder, state, setter }) {
  const [showPassword, setShowPassoword] = useState(false);

  return (
    <div className="flex w-full flex-col items-start justify-center gap-2">
      <label
        htmlFor={labelId}
        className="font-poppins text-lg text-gray-500 drop-shadow-sm"
      >
        {label}
      </label>
      <div className="relative w-full">
        <img
          src={`/${icon}-icon.png`}
          alt=""
          className="absolute left-2 top-[25%] h-[50%] drop-shadow-sm"
        />
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : "text"
          }
          id={labelId}
          className="min-h-[50px] w-full rounded pl-[15%] font-poppins text-gray-700 shadow-sm"
          placeholder={placeholder}
          value={state}
          onChange={(e) => setter(e.target.value)}
        ></input>
        {type === "password" && (
          <img
            src={`/${showPassword ? "hidden" : "show"}-pwd-icon.png`}
            alt=""
            className="absolute right-2 top-[30%] h-[40%] opacity-75"
            onClick={() => setShowPassoword((current) => !current)}
          />
        )}
      </div>
    </div>
  );
}

export default LoginForm;
