import { useEffect, useState } from "react";
import Logo from "../Utils/Logo";
import RouterModal from "../Utils/RouterModal";
import Button from "../Utils/Button";
import axios from "axios";
import Loader from "../Utils/Loader";
import Error from "../Utils/Error";
import ErrorNotification from "../Utils/ErrorNotification";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

function LoginUser({ setUserProp, pathProp }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, path = "/codice-desvelado/read" } = useOutletContext() || {
    setUser: setUserProp,
    path: pathProp,
  };
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/v1/users/login", credentials, {
        withCredentials: true,
      });

      setUser(res.data.data.user);
      navigate(path);
    } catch (err) {
      setUser(null);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <RouterModal path={pathProp || -1}>
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-10">
        {isLoading && <Loader position={"absolute centerDivAbsolute"} />}
        {error && (
          <ErrorNotification
            error={error}
            setError={setError}
            bgColor={"bg-orange-500"}
            position={"bottom-16"}
            textColor={"text-gray-50"}
            width={"w-[80%]"}
            opacityProp="opacity-100"
          >
            {error}
          </ErrorNotification>
        )}
        {!isLoading && (
          <>
            <Header />
            <LoginForm setCredentials={setCredentials} />
            <Button
              fontSize={"text-xl"}
              type="action"
              onAction={() => handleLogin()}
            >
              LOGIN
            </Button>
            <BecomeGopher />
          </>
        )}
      </div>
    </RouterModal>
  );
}

function Header() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Logo clickable={false} width="w-[65%]" />
      <h2 className="text-wide font-noto text-xl text-gray-500 drop-shadow">
        Leitor do Códice
      </h2>
    </div>
  );
}

function LoginForm({ setCredentials }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setCredentials({ email, password });
  }, [email, password, setCredentials]);

  return (
    <div className="flex w-[80%] flex-col items-center justify-center gap-5">
      <div className="flex w-full flex-col items-start justify-center gap-2 font-poppins">
        <label className="text-lg text-gray-500">Email</label>
        <div className="relative w-full">
          <img
            src="/gopher-like.png"
            className="absolute left-2 top-1 h-[75%] rounded-full "
          />
          <input
            type="text"
            placeholder="gopher@go.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-h-[50px] w-full rounded border border-gray-300 p-2 pl-[20%] text-gray-800 shadow outline-none"
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-2 font-poppins">
        <label className="text-lg text-gray-500">Senha</label>
        <div className="relative w-full">
          <img src="/pwd-icon.png" className="absolute left-3 top-2 h-[65%] " />
          <input
            type={`${showPassword ? "text" : "password"}`}
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="min-h-[50px] w-full rounded border border-gray-300 p-2 pl-[20%] text-gray-800 shadow outline-none"
          />
          <img
            src={`/${showPassword ? "hidden" : "show"}-pwd-icon.png`}
            className="absolute right-3 top-3 h-[45%]"
            onClick={() => setShowPassword((state) => !state)}
          />
        </div>
      </div>
      <button className="font-poppins text-sm text-gray-500 underline underline-offset-2">
        Esqueci minha senha
      </button>
    </div>
  );
}

function BecomeGopher() {
  return (
    <div className="flex w-full flex-col items-center justify-center font-poppins">
      <p className="text-sm text-blue-500">Novo no Códice Desvelado?</p>
      <Link to={"/codice-desvelado/signup"}>
        <button className=" text-orange-500 underline underline-offset-2">
          Tornar-se um Gopher!
        </button>
      </Link>
    </div>
  );
}

export default LoginUser;
