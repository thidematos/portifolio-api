import { useParams } from "react-router-dom";
import Logo from "../Utils/Logo";
import validator from "validator";
import { useEffect, useState } from "react";
import Button from "../Utils/Button";
import Footer from "./Footer";
import axios from "axios";
import Loader from "../Utils/Loader";

function ResetPassword() {
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetched, setFetched] = useState(false);

  async function handlePasswordUpdate() {
    if (!password || !confirmPassword || !isValid) return;

    try {
      setIsLoading(true);
      await axios.patch(`/api/v1/users/reset-password/${resetToken}`, {
        password,
        passwordConfirm: confirmPassword,
      });
      setFetched(true);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setFetched(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[100svh] w-full flex-col items-center justify-start gap-12 bg-gray-200 font-poppins">
      <img src="/man-above.jpeg" className="rounded-b-lg shadow" />
      <div className="flex flex-col items-center justify-center gap-1 ">
        <Logo clickable={true} path="/codice-desvelado" width="w-[80%]" />
        <h2 className="text-xl text-gray-800 drop-shadow">
          Recuperação de senha
        </h2>
      </div>
      {isLoading && <Loader />}
      {error && (
        <div className="flex w-[80%] flex-col items-center justify-center">
          <img src="/error.png" className="w-[50%]" />
          <p className="text-lg text-gray-500">Algo deu errado...</p>
          <p className="mt-10 text-justify  text-gray-800">{error}</p>

          <Button
            type="back"
            path={"/codice-desvelado/get-started?forgot-password=true"}
            margin={"mt-10 mb-6"}
          >
            Tentar novamente
          </Button>
          <p className="mt-2 text-center text-sm text-gray-500">
            Lembre-se: o token de reativação da senha expira em 10 minutos!
          </p>
        </div>
      )}
      {!isLoading && !error && fetched && (
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <p className="text-lg text-blue-500">Senha restaurada com sucesso!</p>
          <Button
            type="back"
            path={"/codice-desvelado/read"}
            fontSize={"text-lg"}
          >
            Ir para o Códice
          </Button>
        </div>
      )}
      {!isLoading && !error && !fetched && (
        <>
          <div className="flex w-[90%] flex-col items-center justify-center gap-5 px-8 ">
            <div className=" flex w-full flex-col items-start justify-center gap-1">
              <label htmlFor="password" className="text-lg text-gray-500">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded p-2 text-gray-800 shadow"
              />
            </div>
            <div className=" flex w-full flex-col items-start justify-center gap-1">
              <label
                htmlFor="passwordConfirm"
                className="text-lg text-gray-500"
              >
                Confirmação da senha
              </label>
              <input
                type="password"
                id="passwordConfirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded p-2 text-gray-800 shadow"
              />
            </div>
          </div>
          <PasswordRequirements
            setIsValid={setIsValid}
            password={password}
            confirmPassword={confirmPassword}
          />
          {isValid ? (
            <Button type="action" onAction={() => handlePasswordUpdate()}>
              Atualizar senha
            </Button>
          ) : (
            <p className="w-[80%] text-center text-sm text-blue-500">
              Crie uma nova senha de acesso para o Códice Desvelado.
            </p>
          )}
        </>
      )}

      <Footer
        padding={"py-6"}
        fontSize={"text-sm"}
        position={`${fetched ? "absolute bottom-0" : ""}`}
        textColor={"text-gray-500"}
      />
    </div>
  );
}

function PasswordRequirements({ password, confirmPassword, setIsValid }) {
  const hasLength = validator.isLength(password, { min: 8 });

  const hasUpper =
    [...password].filter(
      (el) => validator.isUppercase(el) && !validator.isNumeric(el),
    ).length > 0;

  const hasNumber =
    [...password].filter((el) => validator.isNumeric(el)).length > 0;

  const isEqual =
    validator.equals(password, confirmPassword) && !validator.isEmpty(password);

  useEffect(() => {
    if (hasLength && hasNumber && hasUpper && isEqual) setIsValid(true);
    else setIsValid(false);
  }, [hasLength, hasUpper, hasNumber, isEqual, setIsValid]);

  return (
    <ul className="text-poppins list-disc text-sm tracking-wider text-gray-500">
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

export default ResetPassword;
