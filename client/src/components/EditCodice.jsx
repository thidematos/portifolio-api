import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import RouterModal from '../Utils/RouterModal';
import EditableInput from '../Utils/EditableInput';
import { useState } from 'react';
import DialogueBox from '../Utils/DialogueBox';
import Button from '../Utils/Button';
import usePatch from '../hooks/usePatch';
import Loader from '../Utils/Loader';
import Error from '../Utils/Error';

function EditCodice() {
  const [codice, setCodice] = useOutletContext();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const field = searchParams.get('field');
  const { codiceId } = useParams();

  const [hasDiff, setHasDiff] = useState(false);
  const [value, setValue] = useState(codice?.[field]);

  const {
    handler: handleSave,
    isLoading,
    error,
  } = usePatch({
    resource: 'codice',
    id: codiceId,
    field: field,
    newValue: value,
    setter: setCodice,
    onSuccessAction: () => {
      navigate(-1);
    },
  });

  return (
    <RouterModal path={-1}>
      <div className="flex flex-col justify-start items-center w-full min-h-full gap-10">
        <img src="/man-above.jpeg" className="rounded-t-lg shadow" />
        {isLoading && (
          <Loader position={'absolute centerDivAbsolute'} size={100} />
        )}
        {error && <Error path={-1} message={error} />}
        {!isLoading && !error && (
          <>
            <EditableInput
              value={value}
              setValue={setValue}
              textArea={{
                cols: 30,
                rows: 2,
              }}
              label={field.toUpperCase()}
              labelClass={'text-xl text-gray-500'}
              setDiff={setHasDiff}
              inputClass={`text-gray-800 p-2 rounded shadow-lg text-lg`}
            />
            {hasDiff && (
              <DialogueBox
                notification={'Deseja salvar as mudanças?'}
                fontSize={'text-sm'}
                textColor={'text-gray-50'}
                bgColor={'bg-blue-500/85'}
                width={'w-[80%]'}
              >
                <div className="flex flex-row justify-around items-center w-full mt-3">
                  <Button
                    bgColor="bg-gray-200"
                    textColor="text-gray-800"
                    type="action"
                    onAction={() => setValue(codice[field])}
                  >
                    Reset
                  </Button>
                  <Button
                    bgColor="bg-orange-500"
                    type="action"
                    onAction={() => {
                      handleSave();
                    }}
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

export default EditCodice;
