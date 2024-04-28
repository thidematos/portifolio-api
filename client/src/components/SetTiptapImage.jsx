import { useOutletContext } from 'react-router-dom';
import RouterModal from './RouterModal';
import ImageUploader from './TestUploader';
import { useState } from 'react';

function SetTiptapImage() {
  const setImages = useOutletContext();
  const [hasImage, setHasImage] = useState(false);
  const [legend, setLegend] = useState('');

  return (
    <RouterModal path={-1} isModalScrollable={true}>
      <div className="flex flex-col w-full justify-center items-center font-poppins gap-6">
        <img
          src="/mern-4.1.png"
          alt=""
          className="rounded-t-xl rounded-r-none"
        />
        <h2 className=" text-2xl text-gray-800 drop-shadow ">IMAGEM</h2>
        {hasImage && (
          <p className="text-gray-400 text-xs pb-1">
            Para escolher outra imagem, clique novamente!
          </p>
        )}
        <ImageUploader
          multiple={false}
          guide={'Selecione uma imagem para o artigo!'}
          withDialogueBox={false}
          setter={setHasImage}
        />
        {hasImage && (
          <div className="flex flex-col justify-center items-center font-poppins">
            <label className="tracking-wider">LEGENDA</label>
            <input
              type="text"
              value={legend}
              onChange={(e) => setLegend(e.target.value)}
              className="p-2 bg-gray-200 rounded text-gray-800 border  border-blue-300 shadow"
            />
          </div>
        )}
        {hasImage && legend && (
          <button
            className="mt-6 px-4 py-2 text-xl rounded shadow drop-shadow text-gray-50 bg-blue-500/90"
            onClick={() =>
              setImages({
                file: hasImage,
                legend: legend,
              })
            }
          >
            ADICIONAR
          </button>
        )}
      </div>
    </RouterModal>
  );
}

export default SetTiptapImage;
