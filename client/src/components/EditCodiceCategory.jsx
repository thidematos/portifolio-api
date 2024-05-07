import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import RouterModal from '../Utils/RouterModal';
import { useState } from 'react';
import DialogueBox from './../Utils/DialogueBox';
import Button from '../Utils/Button';
import usePatch from '../hooks/usePatch';
import Loader from '../Utils/Loader';
import Error from '../Utils/Error';

const categories = [
  'React',
  'Node',
  'MongoDB',
  'Tecnologia',
  'História',
  'Cotidiano',
  'Relatos',
  'Percepções',
  'Novidades',
  'Javascript',
  'Resenha',
];

function EditCodiceCategory() {
  const [codice, setCodice] = useOutletContext();
  const { codiceId } = useParams();
  const [newCategories, setNewCategories] = useState(codice.category);

  const navigate = useNavigate();

  const {
    handler: handleSave,
    isLoading,
    error,
  } = usePatch({
    resource: 'codice',
    id: codiceId,
    field: 'category',
    newValue: newCategories,
    setter: setCodice,
    onSuccessAction: () => navigate(`/admin/dashboard/codice/${codiceId}`),
  });

  const changesMade = !newCategories.every((category) =>
    codice.category.includes(category)
  );

  function handleSelection(category) {
    const includes = newCategories.includes(category);

    if (includes)
      return setNewCategories((state) => state.filter((el) => el !== category));

    setNewCategories((state) => [...state, category]);
  }

  return (
    <RouterModal path={`/admin/dashboard/codice/${codiceId}`}>
      <div className="flex flex-col justify-start items-center h-full rounded-lg pb-8 w-full font-poppins overflow-y-scroll relative">
        <img src="/man-above.jpeg" className="rounded-t-lg" />
        <h2 className="text-gray-800 my-6 text-xl">CATEGORIAS</h2>
        {isLoading && <Loader margin="mt-6" />}
        {error && (
          <Error message={error} path={`/admin/dashboard/codice/${codiceId}`} />
        )}
        {!isLoading && !error && (
          <>
            <div className="flex flex-row justify-start items-center flex-wrap gap-3 w-[85%]">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`w-[30%] ${
                    newCategories.includes(category)
                      ? 'bg-blue-500'
                      : 'bg-gray-500'
                  } p-1 text-gray-50 rounded-xl text-sm shadow duration-100`}
                  onClick={() => handleSelection(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            {!(newCategories.length > 0) && (
              <p className="text-gray-400 mt-6">
                Selecione pelo menos uma categoria!
              </p>
            )}
            {newCategories.length > 0 && changesMade && (
              <DialogueBox
                notification={'Deseja salvar as mudanças?'}
                margin={'mt-6'}
                bgColor={'bg-blue-500'}
                textColor={'text-gray-50'}
              >
                <div className="flex flex-row justify-around items-center mt-3 w-full">
                  <Button
                    bgColor="bg-gray-300"
                    textColor="text-gray-700"
                    onAction={() => setNewCategories(codice.category)}
                    type="action"
                  >
                    Reset
                  </Button>
                  <Button
                    bgColor="bg-orange-500"
                    type="action"
                    onAction={() => handleSave()}
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

export default EditCodiceCategory;
