import { useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function Error({ message, path }) {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col justify-center gap-14 items-center py-10 px-6 font-poppins">
      <p className="text-2xl text-gray-800">Ocorreu um erro...</p>
      <img src="/error.png" alt="" className="w-[45%]"></img>
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-gray-400 text-lg">Descrição do problema:</p>
        <p className="text-lg text-gray-800 w-full text-center">{message}</p>
      </div>

      <Button
        type="back"
        fontSize={'text-xl'}
        margin={'mt-0'}
        onAction={navigate}
        path={path}
      >
        &larr; Voltar
      </Button>

      <div className="font-poppins text-sm w-full flex flex-col justify-center items-center">
        <p className="">Caso precise de ajuda, entre em contato: </p>
        <a
          className={`${isHovered ? 'text-blue-500' : 'text-gray-500'}`}
          href="mailto:raizer50@gmail.com"
          onMouseEnter={() => setIsHovered((state) => !state)}
          onMouseOut={() => setIsHovered((state) => !state)}
        >
          raizer50@gmail.com
        </a>
      </div>
    </div>
  );
}

export default Error;
