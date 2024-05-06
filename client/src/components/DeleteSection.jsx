import { useOutletContext, useSearchParams, useParams } from 'react-router-dom';
import RouterModal from '../Utils/RouterModal';
import ProjectLogo from './ProjectLogo';
import DialogueBox from '../Utils/DialogueBox';
import Button from '../Utils/Button';
import useDelete from '../hooks/useDelete';
import Loader from '../Utils/Loader';
import Error from '../Utils/Error';

function DeleteSection() {
  const [work] = useOutletContext();
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('id');
  const sectionNum = Number(searchParams.get('section'));
  const { id } = useParams();

  const {
    handler: handleDeleteSection,
    isLoading,
    error,
  } = useDelete({
    redirectTo: `/admin/dashboard/works`,
    id: sectionId,
    path: `/api/v1/works/${id}/${sectionId}`,
  });

  return (
    <RouterModal path={-1}>
      <div className="flex flex-col justify-center items-center w-full h-full">
        {isLoading && <Loader />}
        {error && <Error poth={-1} message={error} />}
        {!isLoading && !error && (
          <>
            <ProjectLogo work={work} width={'w-[60%]'} />
            <h2 className="font-poppins w-full text-center py-5">
              {work.sections[sectionNum]?.title.toUpperCase()}
            </h2>
            <div className="flex flex-col justify-center items-center w-full">
              <DialogueBox
                bgColor={'bg-blue-500'}
                width={'w-[80%]'}
                notification={'Deseja mesmo excluir essa seção?'}
                textColor={'text-gray-50'}
              >
                <div className="flex flex-row justify-around items-center w-full mt-5">
                  <Button
                    type="action"
                    bgColor="bg-gray-200"
                    fontSize={'text-gray-700'}
                    onAction={() => handleDeleteSection()}
                  >
                    Excluir
                  </Button>
                  <Button
                    type="back"
                    path={-1}
                    bgColor="bg-orange-400"
                    textColor="text-gray-50"
                  >
                    Voltar
                  </Button>
                </div>
                <p className="font-poppins text-gray-100 text-sm mt-5">
                  Essa ação não pode ser desfeita.
                </p>
              </DialogueBox>
            </div>
          </>
        )}
      </div>
    </RouterModal>
  );
}

export default DeleteSection;
