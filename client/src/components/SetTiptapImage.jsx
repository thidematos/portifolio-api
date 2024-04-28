import { useOutletContext } from 'react-router-dom';
import RouterModal from './RouterModal';
import ImageUploader from './TestUploader';
import { useState } from 'react';

function SetTiptapImage() {
  const setImages = useOutletContext();
  const [hasImage, setHasImage] = useState(false);

  return (
    <RouterModal path={-1}>
      <div className="flex flex-col w-full justify-center items-center font-poppins">
        <img src="/mern-4.1.png" alt="" className="rounded-t-xl" />
        <h2 className=" text-2xl text-gray-800 drop-shadow py-8">IMAGEM</h2>
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
          <button
            className="my-8 px-4 py-2 text-xl rounded shadow drop-shadow text-gray-50 bg-blue-500/90"
            onClick={() => setImages(hasImage)}
          >
            ADICIONAR
          </button>
        )}
      </div>
    </RouterModal>
  );
}

export default SetTiptapImage;
