import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import ProjectLogo from './ProjectLogo';
import RouterModal from '../Utils/RouterModal';
import { useEffect, useRef, useState } from 'react';
import DialogueBox from '../Utils/DialogueBox';
import Button from '../Utils/Button';
import usePatch from '../hooks/usePatch';
import Loader from '../Utils/Loader';
import Error from '../Utils/Error';
import ColorInput from '../Utils/ColorInput';

function ColorPicker() {
  const [work, setWork] = useOutletContext();
  const [isChanged, setIsChanged] = useState(false);
  const [actualColors, setActualColors] = useState({
    from: work.colors?.from,
    to: work.colors?.to,
  });
  const { id } = useParams();

  const originalColor = useRef({
    from: work.colors?.from,
    to: work.colors?.to,
  });

  const {
    handler: onSave,
    isLoading,
    error,
  } = usePatch({
    resource: 'works',
    id,
    field: 'colors',
    newValue: actualColors,
    setter: setWork,
  });

  useEffect(() => {
    setIsChanged(
      originalColor.current.from !== actualColors.from ||
        originalColor.current.to !== actualColors.to
    );
  }, [actualColors]);

  function handleChangeColor(e, direction) {
    setActualColors((state) => {
      return {
        ...state,
        [`${direction}`]: e.target.value,
      };
    });
  }

  function onReset() {
    setActualColors(originalColor.current);
  }

  return (
    <RouterModal path={-1}>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <ProjectLogo work={work} width={'w-[70%]'} margin={'mt-4'} />
        {isLoading && <Loader />}
        {error && <Error message={error} path={-1} />}
        {!isLoading && !error && (
          <div className="flex flex-col justify-center items-center font-poppins my-6 gap-5">
            <p className=" text-center text-gray-500">
              Selecione as cores de seu gradiente
            </p>
            <div className="flex flex-row justify-around items-center w-full">
              <ColorInput
                color={actualColors}
                label={`From`}
                direction={'from'}
                onChangeColor={handleChangeColor}
              />
              <ColorInput
                color={actualColors}
                label={'To'}
                direction={'to'}
                onChangeColor={handleChangeColor}
              />
            </div>
            {isChanged && (
              <DialogueBox
                notification={'Deseja salvar as mudanças?'}
                bgColor={'bg-blue-500/85'}
                textColor={'text-gray-50'}
              >
                <div className="flex flex-row justify-around w-full items-center mt-4">
                  <Button
                    fontSize={'text-sm'}
                    bgColor="bg-gray-200"
                    textColor="text-gray-700"
                    type="action"
                    onAction={() => onReset()}
                  >
                    Reset
                  </Button>
                  <Button
                    fontSize={'text-base'}
                    bgColor="bg-orange-400"
                    textColor="text-gray-50"
                    type="action"
                    onAction={() => {
                      onSave();
                      originalColor.current = actualColors;
                      setIsChanged(false);
                    }}
                  >
                    Salvar
                  </Button>
                </div>
              </DialogueBox>
            )}
          </div>
        )}
      </div>
    </RouterModal>
  );
}

export default ColorPicker;
