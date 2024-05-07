import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import RouterModal from '../Utils/RouterModal';
import Tiptap from '../Utils/Tiptap';
import { useState } from 'react';
import DialogueBox from '../Utils/DialogueBox';
import Button from '../Utils/Button';
import ImageUploader from '../Utils/TestUploader';
import axios from 'axios';
import Loader from '../Utils/Loader';
import Error from '../Utils/Error';

function EditCodiceContent() {
  const [codice, setCodice] = useOutletContext();

  const { codiceId } = useParams();

  const [images, setImages] = useState([]);
  const [html, setHTML] = useState(null);
  const [json, setJSON] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function patchCodice() {
    try {
      setIsLoading(true);
      const form = createForm();

      const res = await axios.patch(`/api/v1/codice/${codiceId}`, form, {
        withCredentials: true,
      });

      setCodice(res.data.data.codice);

      navigate(`/admin/dashboard/codice/${codiceId}`);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  function createForm() {
    const form = new FormData();
    const content = { html, json };

    const imagesInfo = images.map((image) => {
      form.append('images', image.file);

      return {
        blob: image.url,
        legend: image.leged,
      };
    });

    form.append('imagesInfo', JSON.stringify(imagesInfo));
    form.append('content', JSON.stringify(content));

    return form;
  }

  function uploadImage(image) {
    console.log('hello from uploader');

    const url = window.URL.createObjectURL(image.file);
    setImages((state) => [
      ...state,
      {
        file: image.file,
        url: url,
        legend: image.legend,
      },
    ]);
  }

  return (
    <>
      <Outlet context={uploadImage} />

      <RouterModal
        isModalScrollable={true}
        path={-1}
        hidden={window.location.pathname.includes('setImage')}
      >
        <div
          className={`min-h-full w-full flex flex-col justify-start items-center relative `}
        >
          {isLoading && <Loader position={'absolute centerDivAbsolute'} />}
          {error && (
            <Error
              message={error}
              path={`/admin/dashboard/codice/${codiceId}`}
            />
          )}
          {!isLoading && !error && (
            <>
              <h2 className="font-poppins text-gray-800 text-2xl my-10">
                CONTEÚDO
              </h2>
              <p className="text-gray-500 text-sm text-center w-full mb-2">
                Edite o conteúdo do códice e salve as alterações!
              </p>
              <Tiptap
                images={images}
                setImages={setImages}
                setPostHTML={setHTML}
                setJSON={setJSON}
                initContent={codice?.content}
                size="w-full min-h-full"
                useSelfContext={false}
              />
              <DialogueBox
                notification={'Deseja salvar o códice?'}
                bgColor={'bg-blue-500/85'}
                textColor={'text-gray-50'}
                margin={'my-10'}
                width={'w-[75%]'}
              >
                <div className="flex flex-row justify-around items-center w-full mt-3">
                  <Button
                    textColor="text-gray-800"
                    bgColor="bg-gray-300"
                    type="back"
                    path={-1}
                  >
                    Voltar
                  </Button>
                  <Button
                    textColor="text-gray-50"
                    bgColor="bg-orange-500"
                    type="action"
                    onAction={patchCodice}
                  >
                    Salvar
                  </Button>
                </div>
              </DialogueBox>
            </>
          )}
        </div>
      </RouterModal>
    </>
  );
}

export default EditCodiceContent;
