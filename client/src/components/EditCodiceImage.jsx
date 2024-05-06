import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import RouterModal from '../Utils/RouterModal';
import ImageUploader from '../Utils/TestUploader';

function EditCodiceImage() {
  const [codice, setCodice] = useOutletContext();
  const { codiceId } = useParams();
  const [searchParams] = useSearchParams();
  const field = searchParams.get('field');

  return (
    <RouterModal path={-1}>
      <div className="flex flex-col justify-center items-center h-full font-poppins">
        <h5 className="text-gray-800 text-xl">Imagem atual:</h5>
        <img src={`/${codice?.cover}`} className="shadow" />
        <ImageUploader
          multiple={false}
          guide={'Clique para escolher uma capa!'}
        />
      </div>
    </RouterModal>
  );
}

export default EditCodiceImage;
