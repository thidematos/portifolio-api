import { useState } from 'react';
import Tiptap from './Tiptap';

function CreateCodice() {
  const [images, setImages] = useState([]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <Tiptap setImages={setImages} images={images} />
    </div>
  );
}

export default CreateCodice;
