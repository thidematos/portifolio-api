import { useOutletContext, useParams } from 'react-router-dom';
import ProjectLogo from './ProjectLogo';
import RouterModal from './RouterModal';
import DialogueBox from './DialogueBox';
import Button from './Button';
import useDelete from '../hooks/useDelete';
import Loader from './Loader';
import Error from './Error';

function DeleteWork() {
  const [work] = useOutletContext();
  const { id } = useParams();

  const { handler, isLoading, error } = useDelete({
    redirectTo: '/admin/dashboard/works',
    resource: 'works',
    id: id,
  });

  return (
    <RouterModal path={-1}>
      <div className="w-full flex flex-col justify-around h-full items-center py-10">
        <ProjectLogo work={work} width={'w-[60%]'} />
        {isLoading && <Loader width="w-full" />}
        {error && <Error message={error} path={-1} />}
        <DialogueBox
          width={'w-[85%]'}
          bgColor={'bg-gray-300'}
          textColor={'text-gray-700'}
          notification={'Deseja mesmo excluir esse projeto?'}
          fontSize={'text-xl'}
        >
          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-row justify-around items-center w-full my-8">
              <Button
                bgColor="bg-orange-400"
                type="action"
                onAction={() => handler()}
              >
                Excluir
              </Button>
              <Button type="back" path={-1}>
                VOLTAR
              </Button>
            </div>
            <p className="font-poppins text-center text-gray-600 text-sm">
              Essa ação é permanente e não pode ser desfeita.
            </p>
          </div>
        </DialogueBox>
      </div>
    </RouterModal>
  );
}

export default DeleteWork;
