import { useEffect, useState } from 'react';
import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import RouterModal from './RouterModal';
import ProjectLogo from './ProjectLogo';
import TestUploader from './TestUploader';
import ErrorNotification from './ErrorNotification';
import usePatch from '../hooks/usePatch';
import Loader from './Loader';
import Error from './Error';

function AddSection() {
  const [work, setWork] = useOutletContext();
  const [searchParams] = useSearchParams();
  const sectionIndex = searchParams.get('section');
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [form, setForm] = useState(null);
  const [formMissing, setFormMissing] = useState('');

  const navigate = useNavigate();

  const {
    handler: patchSection,
    isLoading,
    error,
  } = usePatch({
    resource: 'works',
    newValue: form,
    setter: setWork,
    isImage: true,
    usePath: `/api/v1/works/add-section/${id}?sectionIndex=${sectionIndex}`,
  });

  useEffect(() => {
    if (!form) return;

    if (!title) return setFormMissing('Insira um título!');

    if (!description) return setFormMissing('Insira uma descrição!');

    patchSection();

    navigate(`/admin/dashboard/works/${id}`);
  }, [form, title, description]);

  function appendMoreData(form) {
    if (!title || !description) return false;
    form.append('title', title);
    form.append('description', description);

    return true;
  }

  return (
    <RouterModal path={-1} isModalScrollable={true}>
      <div className="w-full h-full flex flex-col justify-start items-center relative">
        <ProjectLogo work={work} width={'w-[50%]'} margin={'mt-6'} />
        {isLoading && <Loader />}
        {error && <Error path={-1} message={error} />}
        {!isLoading && !error && (
          <div className="flex flex-col justify-center items-center w-full my-6">
            <div className="w-[80%] flex flex-col justify-center items-center gap-6">
              <InputText
                state={title}
                setter={setTitle}
                label={'Título'}
                id={'title'}
                placeholder={'Use um título atrativo!'}
              />
              <InputText
                state={description}
                setter={setDescription}
                label={'Descrição'}
                id={'description'}
                placeholder={'Descreva esse diferencial.'}
              />
              <div className="w-full flex flex-col justify-center items-center gap-2 font-poppin">
                <h4 className="text-gray-700 drop-shadow text-lg ">IMAGEM</h4>
                <p className=" text-gray-400 text-xs">
                  Clique para alterar a imagem!
                </p>
                <TestUploader
                  multiple={false}
                  field={'img'}
                  guide={'Escolha uma imagem para sua seção!'}
                  setForm={setForm}
                  dialogueWidth="w-[85%]"
                  appendMoreData={appendMoreData}
                />
              </div>
            </div>
          </div>
        )}

        {formMissing && (
          <ErrorNotification
            error={formMissing}
            setError={setFormMissing}
            bgColor={'bg-orange-400'}
            position={'bottom-0'}
            textColor={'text-gray-50'}
            width={'w-[60%]'}
            fontSize={'text-lg'}
            opacityProp="opacity-100"
          >
            {formMissing}
          </ErrorNotification>
        )}
        <FooterInfo prevSection={work.sections?.[sectionIndex].title} />
      </div>
    </RouterModal>
  );
}

function InputText({ state, setter, id, label, placeholder }) {
  return (
    <div className="w-full flex flex-col justify-center items-start font-poppins gap-2">
      <label htmlFor={`${id}`} className="text-gray-700 drop-shadow text-lg">
        {label?.toUpperCase()}
      </label>
      <textarea
        value={state}
        onChange={(e) => setter(e.target.value)}
        id={id}
        rows={id === 'title' ? 1 : 5}
        className={`text-gray-700 text-base p-2 w-full border border-orange-300 shadow rounded placeholder:text-sm placeholder:text-center`}
        placeholder={placeholder}
      />
    </div>
  );
}

function FooterInfo({ prevSection }) {
  return (
    <footer className="font-poppins text-gray-400 text-xs py-6 text-center w-[80%]">
      <p>
        A nova seção será adicionada depois da seção{' '}
        <strong>{prevSection}</strong>
      </p>
    </footer>
  );
}

export default AddSection;
