import { useEffect, useReducer, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import Modal from './Modal';
import DialogueBox from './DialogueBox';
import Button from './Button';

const initialState = {
  images: [],
  imageSelected: {},
  changed: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'imageUpload':
      return {
        ...state,
        images: action.payload,
        changed: true,
        imageSelected: action.multiple ? state.imageSelected : action.payload,
      };

    case 'imageSelected':
      return {
        ...state,
        imageSelected: action.payload,
      };

    case 'reset':
      console.log('Reseted!');
      state.images.forEach((image) => window.URL.revokeObjectURL(image.src));
      return {
        ...state,
        images: [],
        imageSelected: [],
        changed: false,
      };

    default:
      throw new Error('unknow action damn');
  }
}

function ImageUploader({ multiple, guide, field, setForm }) {
  const [states, dispatch] = useReducer(reducer, initialState);

  const [isOpenModal, setIsOpenModal] = useState(false);

  function stopDefaultBehavior(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function handleUpload(e) {
    e.stopPropagation();
    e.preventDefault();
    if (states.images.length > 0) dispatch({ type: 'reset' });

    const images = Object.values(e.target.files || e.dataTransfer.files);

    dispatch({
      type: 'imageUpload',
      multiple: multiple,
      payload: images.map((image) => {
        return {
          file: image,
          src: window.URL.createObjectURL(image),
        };
      }),
    });
  }

  return (
    <>
      <FileInput onFileUpload={handleUpload} multiple={multiple} />
      <DropLabelArea
        dependencies={{ stopDefaultBehavior, handleUpload, states }}
        guide={guide}
        multiple={multiple}
      />
      {multiple && states.images.length > 0 && (
        <UploadedSwiper>
          {states.images.map((image) => {
            return (
              <SwiperSlide
                className="w-full max-h-[250px] overflow-hidden flex flex-col justify-center items-center bg-orange-300"
                key={image.src}
                onClick={() => {
                  setIsOpenModal(true);
                  dispatch({
                    type: 'imageSelected',
                    payload: image,
                  });
                }}
              >
                <img src={image.src} className="w-full" />
              </SwiperSlide>
            );
          })}
        </UploadedSwiper>
      )}
      {states.changed && (
        <DialogueBox
          notification={'Deseja salvar a mudança?'}
          bgColor={'bg-blue-500/85'}
          textColor={'text-gray-50'}
          width={'w-[70%]'}
          margin={'mt-4'}
        >
          <div className="flex flex-row justify-around items-center w-full mt-4">
            <Button
              type="action"
              onAction={() => dispatch({ type: 'reset' })}
              bgColor="bg-blue-100"
              textColor="text-gray-500"
            >
              Reset
            </Button>
            <Button
              type="action"
              onAction={() => {
                const form = new FormData();

                form.append(field, states.imageSelected.at(0).file);
                form.append('fieldToPatch', field);
                setForm(form);

                dispatch({ type: 'reset' });
              }}
              bgColor="bg-orange-400"
              textColor="text-gray-50"
            >
              Salvar
            </Button>
          </div>
        </DialogueBox>
      )}
      <Modal isOpenModal={isOpenModal} onOpenModal={setIsOpenModal}>
        <img src={states.imageSelected.src} />
      </Modal>
    </>
  );
}

function UploadedSwiper({ children }) {
  return (
    <Swiper
      grabCursor={true}
      effect={'creative'}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }}
      loop={true}
      modules={[EffectCreative]}
      className="w-full markup"
    >
      {children}
    </Swiper>
  );
}

function FileInput({ onFileUpload, multiple }) {
  return (
    <input
      type="file"
      multiple={multiple}
      onChange={onFileUpload}
      className="hidden"
      id="fileInput"
      accept="image/*"
      name="fileInput"
    />
  );
}

function DropLabelArea({ dependencies, guide, multiple }) {
  const src = dependencies.states.imageSelected[0]?.src;
  return (
    <label
      className={`w-[90%] text-center border-dashed border h-[200px] border-blue-500 flex flex-col justify-center items-center z-[9995] overflow-hidden`}
      htmlFor="fileInput"
      onDrop={dependencies.handleUpload}
      onDragEnter={dependencies.stopDefaultBehavior}
      onDragOver={dependencies.stopDefaultBehavior}
    >
      {src ? <img src={src} className="w-full" /> : <span>{guide}</span>}
    </label>
  );
}

export default ImageUploader;
