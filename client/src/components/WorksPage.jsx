import useGetData from "../hooks/useGetData";
import Loader from "../Utils/Loader";
import Error from "../Utils/Error";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Utils/Button";
import DialogueBox from "../Utils/DialogueBox";
import axios from "axios";

function WorksPage() {
  const {
    data: works,
    setData,
    error,
    isLoading,
  } = useGetData("/api/v1/works?sort=viewOrder", false);

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
          (doc) => originalRef.current[doc]._id,
        );
        const newIndexes = changedIds.map((id) =>
          works.findIndex((work) => work._id === id),
        );

        const updatePromises = changedIds.map((id, ind) =>
          axios.patch(
            `/api/v1/works/${id}`,
            {
              viewOrder: Number(newIndexes[ind]),
            },
            {
              withCredentials: true,
            },
          ),
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
    <div className="flex w-full flex-col items-center justify-center pb-6">
      {isLoading && <Loader position={"absolute centerDivAbsolute"} />}
      {error && <Error message={error} />}
      {!isLoading && !error && (
        <>
          <h3 className="w-full bg-gray-200 pt-6 text-center font-poppins text-base text-gray-500">
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
              notification={"Mudanças foram feitas. Deseja salvá-las?"}
              bgColor={"bg-blue-200"}
              textColor={"text-gray-500"}
              width={"w-[70%]"}
              margin={"mt-10"}
            >
              {isLoadingDialogue && <Loader width="w-[60%]" margin="mt-3" />}
              {!isLoadingDialogue && (
                <Button
                  type="action"
                  onAction={handleSaveOrder}
                  fontSize={"text-lg"}
                  margin={"mt-3"}
                >
                  Salvar ordem
                </Button>
              )}
            </DialogueBox>
          )}
          <div className="flex w-full flex-row items-center justify-around">
            <Button
              fontSize={"text-lg"}
              bgColor="bg-gray-400"
              type="back"
              path={"/admin/dashboard"}
              margin={"mt-10"}
              width={"w-[40%]"}
              padding="py-3"
            >
              &larr; Voltar
            </Button>
            <Button
              fontSize={"text-lg"}
              bgColor="bg-blue-500"
              type="back"
              path={"/admin/dashboard/create-work"}
              margin={"mt-10"}
              width={"w-[40%]"}
              padding="py-3"
            >
              Novo projeto
            </Button>
          </div>
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
              className="flex w-full flex-col items-center justify-center gap-6 bg-gray-200 py-8 shadow-xl"
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
            className={`relative min-h-[160px] w-[80%] overflow-hidden  rounded-lg border border-orange-300 shadow-lg`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Link to={`${work._id}`}>
              <h1 className="absolute left-[5%] top-[5%] z-[50] w-[60%] rounded bg-blue-500 px-4 py-2 text-center font-poppins text-xl text-gray-100 shadow-lg drop-shadow ">
                {work.title}
              </h1>
              <img
                src={`/${work.src}`}
                className=" absolute top-0 z-[40] opacity-60 brightness-[.85] grayscale-[25%] duration-150"
              />
            </Link>
          </li>
        );
      }}
    </Draggable>
  );
}

export default WorksPage;
