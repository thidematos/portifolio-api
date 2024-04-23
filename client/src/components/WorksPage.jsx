import useGetData from '../hooks/useGetData';
import Loader from './Loader';
import Error from './Error';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import DialogueBox from './DialogueBox';
import axios from 'axios';

function WorksPage() {
  const {
    data: works,
    setData,
    error,
    isLoading,
  } = useGetData('/api/v1/works?sort=viewOrder', false);

  const [isReordered, setIsReordered] = useState(false);

  const [isLoadingDialogue, setIsLoadingDialogue] = useState(false);

  const changedRef = useRef([]);

  const originalRef = useRef(null);

  function handleSaveOrder() {
    const updateOrder = async () => {
      try {
        setIsLoadingDialogue(true);
        const changedDocuments = [...new Set(changedRef.current)];
        const changedIds = changedDocuments.map(
          (doc) => originalRef.current[doc]._id
        );
        const newIndexes = changedIds.map((id) =>
          works.findIndex((work) => work._id === id)
        );

        const updatePromises = changedIds.map((id, ind) =>
          axios.patch(
            `http://127.0.0.1:3000/api/v1/works/${id}`,
            {
              viewOrder: Number(newIndexes[ind]),
            },
            {
              withCredentials: true,
            }
          )
        );

        await Promise.all(updatePromises);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoadingDialogue(false);
        setIsReordered(false);
      }
    };
    updateOrder();
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {isLoading && <Loader position={'absolute centerDivAbsolute'} />}
      {error && <Error message={error} />}
      {!isLoading && !error && (
        <>
          <h3 className="bg-gray-200 w-full text-center font-poppins text-gray-500 text-lg pt-6">
            🧵 Arraste para reordenar!
          </h3>
          <WorksList
            works={works}
            onReorder={(itens) => {
              setData(itens);
              setIsReordered(true);
            }}
            changedRef={changedRef}
            originalRef={originalRef}
          >
            {works.map((work, ind) => (
              <Work key={work._id} work={work} ind={ind} />
            ))}
          </WorksList>
          {isReordered && (
            <DialogueBox
              notification={'Mudanças foram feitas. Deseja salvá-las?'}
              bgColor={'bg-blue-200'}
              textColor={'text-gray-500'}
              width={'w-[70%]'}
              margin={'mt-10'}
            >
              {isLoadingDialogue && <Loader width="w-[60%]" margin="mt-3" />}
              {!isLoadingDialogue && (
                <Button
                  type="action"
                  onAction={handleSaveOrder}
                  fontSize={'text-lg'}
                  margin={'mt-3'}
                >
                  Salvar ordem
                </Button>
              )}
            </DialogueBox>
          )}
        </>
      )}
    </div>
  );
}

function reorder(list, startIndex, endIndex) {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function WorksList({ children, works, onReorder, changedRef, originalRef }) {
  function onDragEnd(result) {
    if (!result.destination) return;

    if (!originalRef.current && works.length) originalRef.current = works;

    const itens = reorder(works, result.source.index, result.destination.index);

    changedRef.current = [
      ...changedRef.current,
      result.source.index,
      result.destination.index,
    ];

    onReorder([...itens]);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="works" type="list" direction="vertical">
        {(provided) => {
          return (
            <ul
              ref={provided.innerRef}
              className="flex flex-col justify-center items-center w-full bg-gray-200 gap-6 py-8 shadow-xl"
              {...provided.droppableProps}
            >
              {children}
              {provided.placeholder}
            </ul>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}

function Work({ work, ind }) {
  return (
    <Draggable index={ind} draggableId={work._id}>
      {(provided) => {
        return (
          <li
            className={`border border-orange-500 w-[80%] rounded-lg  min-h-[160px] shadow-lg relative overflow-hidden`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Link to={`${work._id}`}>
              <h1 className="z-[50] top-[5%] left-[5%] absolute font-poppins text-xl bg-blue-500 px-4 py-2 rounded text-gray-100 drop-shadow shadow-lg w-[60%] text-center ">
                {work.title}
              </h1>
              <img
                src={`/${work.src}`}
                className=" absolute z-[40] top-0 opacity-60 brightness-[.85] grayscale-[25%] duration-150"
              />
            </Link>
          </li>
        );
      }}
    </Draggable>
  );
}

export default WorksPage;
