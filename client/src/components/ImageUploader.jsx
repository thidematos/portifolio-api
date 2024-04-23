import { useEffect, useReducer, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import Modal from './Modal';

const initialState = {
  images: [],
  imageSelected: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'imageUpload':
      return { ...state, images: action.payload };

    case 'imageSelected':
      return {
        ...state,
        imageSelected: action.payload,
      };

    case 'resetUrl':
      state.images.forEach((image) => window.URL.revokeObjectURL(image.src));
      return {
        ...state,
        images: [],
      };

    default:
      throw new Error('unknow action damn');
  }
}

function ImageUploader() {
  const [states, dispatch] = useReducer(reducer, initialState);

  const [isOpenModal, setIsOpenModal] = useState(false);

  console.log(states);

  function stopDefaultBehavior(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function handleUpload(e) {
    e.stopPropagation();
    e.preventDefault();
    if (states.images.length > 0) dispatch({ type: 'resetUrl' });

    const images = Object.values(e.target.files || e.dataTransfer.files);

    dispatch({
      type: 'imageUpload',
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
      <FileInput onFileUpload={handleUpload} />
      <DropLabelArea
        onFileUpload={handleUpload}
        stopDefaultBehavior={stopDefaultBehavior}
      />
      {states.images.length > 0 && (
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

function FileInput({ onFileUpload }) {
  return (
    <input
      type="file"
      multiple={true}
      onChange={onFileUpload}
      className="hidden"
      id="fileInput"
    />
  );
}

function DropLabelArea({ stopDefaultBehavior, onFileUpload }) {
  return (
    <label
      className="w-[90%] text-center h-[150px] border-dashed border border-blue-500 flex flex-col justify-center items-center z-[9995]"
      htmlFor="fileInput"
      onDrop={onFileUpload}
      onDragEnter={stopDefaultBehavior}
      onDragOver={stopDefaultBehavior}
    >
      <span>Drop your files here</span>
    </label>
  );
}

export default ImageUploader;
