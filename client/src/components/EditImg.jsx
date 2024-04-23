import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import RouterModal from './RouterModal';

import { useEffect, useState } from 'react';
import TestUploader from './TestUploader';
import usePatch from '../hooks/usePatch';
import Loader from './Loader';
import Error from './Error';

function EditImg() {
  const [work, setWork] = useOutletContext();
  const [searchParams] = useSearchParams();
  const [formToPatch, setFormToPatch] = useState(null);

  const { id } = useParams();
  const field = searchParams.get('field');
  const section = searchParams.get('section');
  const sectionValue = work.sections[section]?.[field];

  const { handler, isLoading, error } = usePatch({
    resource: 'works',
    id: id,
    field: field,
    isSectionField: section ? work.sections[section]?._id : false,
    newValue: formToPatch,
    setter: setWork,
    isImage: true,
  });

  useEffect(() => {
    if (!formToPatch) return;

    handler();
  }, [formToPatch]);

  return (
    <div>
      <RouterModal isModalScrollable={true} path={-1}>
        {isLoading && (
          <Loader width="full" position={'absolute centerDivAbsolute'} />
        )}
        {error && <Error message={error} path={'/admin/dashboard/works'} />}
        {!isLoading && !error && (
          <div className="w-full h-full flex flex-col justify-center items-center font-poppins gap-5">
            <h1 className=" text-2xl text-gray-700">
              {work.title?.toUpperCase()}
            </h1>
            <Content>
              <Label>Imagem atual:</Label>
              <img src={`/${section ? sectionValue : work[field]}`} />
            </Content>
            <Content>
              <Label>Clique para alterar a imagem:</Label>
              <TestUploader
                multiple={false}
                guide={'Selecione uma imagem!'}
                field={field}
                setForm={setFormToPatch}
              />
            </Content>
          </div>
        )}
      </RouterModal>
    </div>
  );
}

function Content({ children, gap = 'gap-2' }) {
  return (
    <div
      className={`w-full text-gray-500 flex flex-col justify-center items-center ${gap}`}
    >
      {children}
    </div>
  );
}

function Label({ children }) {
  return <p className="text-lg">{children}</p>;
}

export default EditImg;
