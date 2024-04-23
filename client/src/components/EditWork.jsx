import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import RouterModal from './RouterModal';
import ProjecLogo from './ProjectLogo';
import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import usePatch from './../hooks/usePatch';
import Loader from './Loader';

function EditWork() {
  const [work, setWork] = useOutletContext();

  return (
    <RouterModal path={-1}>
      <div className="w-full h-full bg-gray-200 rounded-xl flex flex-col justify-center items-center">
        <ProjecLogo work={work} padding={'pt-6'} width={'w-[65%]'} />
        <EditField work={work} onUpdateResource={setWork} />
      </div>
    </RouterModal>
  );
}

function EditField({ work, isMobile = true, onUpdateResource }) {
  const [searchParams] = useSearchParams();
  const field = searchParams.get('field');
  const { id } = useParams();

  const inputRef = useRef(null);
  const originalField = useRef(work[field]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [actualValue, setActualValue] = useState(work[field]);
  const [changesMade, setChangesMade] = useState(false);

  const { handler: handleSave, ...states } = usePatch({
    resource: 'works',
    id,
    field,
    newValue: actualValue,
    setter: onUpdateResource,
  });

  useEffect(() => {
    if (actualValue !== originalField.current) setChangesMade(true);
    if (actualValue === originalField.current) setChangesMade(false);
  }, [actualValue]);

  useEffect(() => {
    if (isEditMode) inputRef.current.focus();
  }, [isEditMode]);

  function handleHovered() {
    if (isMobile) return setIsHovered(true);

    setIsHovered((state) => !state);
  }

  function handleReset() {
    setActualValue(work[field]);
  }

  function dispatchSave() {
    handleSave();
    setChangesMade(false);
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div
        className="font-poppins  flex flex-col justify-center items-center w-full text-gray-800 relative py-4"
        onMouseOver={handleHovered}
        onMouseOut={handleHovered}
      >
        <span className="flex flex-col justify-center items-center gap-6">
          <h4 className="self-start text-center w-full">
            Clique para alterar{' '}
            <span className="text-blue-500">{field.toUpperCase()}</span>
          </h4>
          <textarea
            type="text"
            ref={inputRef}
            value={actualValue}
            rows={9}
            cols={35}
            className={`cursor-text rounded outline-none text-base ${
              isEditMode
                ? 'bg-neutral-50 border border-orange-500 shadow'
                : 'bg-transparent border-dashed border border-gray-400'
            } duration-300 py-3 px-2 drop-shadow-sm tracking-wide placeholder:text-sm placeholder:text-center break-words`}
            readOnly={!isEditMode}
            onChange={(e) => setActualValue(e.target.value)}
            onClick={() => setIsEditMode(true)}
            onBlur={() => setIsEditMode(false)}
            placeholder={`Clique para alterar o ${field}`}
          />
        </span>
        {!isEditMode && !isMobile && (
          <img
            src="/edit.png"
            alt=""
            className={`${
              isHovered ? 'block' : 'hidden'
            } cursor-pointer w-[5%] absolute right-10 top-[55%]`}
            onClick={() => setIsEditMode(true)}
          />
        )}
      </div>

      <DialogueChanges
        onReset={handleReset}
        margin={'mt-3'}
        changesText={'Deseja salvar as mudanças?'}
        onlyText={'As mudanças feitas serão aplicadas no projeto.'}
        isOnlyText={changesMade ? false : true}
        onSave={dispatchSave}
        states={states}
      />
    </div>
  );
}

function DialogueChanges({
  onReset,
  margin,
  isOnlyText = false,
  changesText,
  onlyText,
  onSave,
  states,
}) {
  return (
    <div
      className={`${margin} w-[70%] bg-blue-500 p-5 font-poppins text-gray-50 flex flex-col justify-center items-center rounded-lg`}
    >
      {states.isLoading && <Loader width="w-[70%]" />}
      {!states.error && !states.isLoading && (
        <>
          <h5 className="text-center text-sm">
            {isOnlyText ? onlyText : changesText}
          </h5>
          {!isOnlyText && (
            <div className=" flex flex-row justify-around items-center w-full mt-4">
              <Button
                bgColor="bg-gray-200"
                type={'action'}
                onAction={onReset}
                fontSize={'text-xs'}
                textColor="text-gray-700"
                padding="px-4 py-2"
              >
                Reset
              </Button>
              <Button
                bgColor="bg-orange-400/95"
                type={'action'}
                onAction={onSave}
                fontSize={'text-xs'}
                padding="px-4 py-2"
              >
                Salvar
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default EditWork;
