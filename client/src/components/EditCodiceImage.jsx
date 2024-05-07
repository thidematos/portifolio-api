import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import RouterModal from '../Utils/RouterModal';
import ImageUploader from '../Utils/TestUploader';
import { useEffect, useState } from 'react';
import DialogueBox from '../Utils/DialogueBox';
import Button from '../Utils/Button';
import usePatch from '../hooks/usePatch';
import Loader from './../Utils/Loader';
import Error from './../Utils/Error';

function EditCodiceImage() {
  const [codice, setCodice] = useOutletContext();
  const { codiceId } = useParams();
  const [searchParams] = useSearchParams();
  const field = searchParams.get('field');
  const [image, setImage] = useState(null);
  const [form, setForm] = useState(null);

  const navigate = useNavigate();

  const {
    handler: handleSave,
    isLoading,
    error,
  } = usePatch({
    resource: 'codice',
    id: codiceId,
    field: field,
    setter: setCodice,
    newValue: form,
    isImage: true,
    onSuccessAction: () => navigate(-1),
  });

  useEffect(() => {
    if (!image) return;

    const newForm = new FormData();

    newForm.append('cover', image);

    setForm(newForm);
  }, [image]);

  return (
    <RouterModal path={-1} isModalScrollable={true}>
      <div className="flex flex-col justify-start items-center min-h-full font-poppins gap-8 my-8">
        <h5 className="text-gray-800 text-xl">{field.toUpperCase()}</h5>
        {isLoading && <Loader position={'absolute centerDivAbsolute'} />}
        {error && <Error message={error} path={-1} />}
        {!isLoading && !error && (
          <>
            <div className="flex flex-col justify-center items-center gap-2">
              <p className="text-gray-500">Imagem atual</p>
              <img src={`/${codice?.cover}`} className="shadow" />
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-full">
              <p className="text-gray-500">Nova imagem:</p>
              <ImageUploader
                multiple={false}
                guide={'Clique para escolher uma capa!'}
                setter={setImage}
                withDialogueBox={false}
              />
            </div>
            {image && (
              <DialogueBox
                notification={'Deseja salvar a alteração?'}
                bgColor={'bg-blue-500/85'}
                textColor={'text-gray-50'}
                width={'w-[80%]'}
                fontSize={'text-sm'}
              >
                <div className="flex flex-row w-full justify-around items-center mt-3">
                  <Button
                    type="back"
                    path={-1}
                    bgColor="bg-gray-300 text-gray-700"
                  >
                    Voltar
                  </Button>
                  <Button
                    type="action"
                    onAction={() => handleSave()}
                    bgColor="bg-orange-500"
                    textColor="text-gray-50"
                  >
                    Salvar
                  </Button>
                </div>
              </DialogueBox>
            )}
          </>
        )}
      </div>
    </RouterModal>
  );
}

export default EditCodiceImage;
