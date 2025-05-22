import { H1 } from '@atomic/atm.typography';
import { boardStrings } from './board-page.strings';
import { BoardColumn } from '@atomic/atm.board/board.component';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import React, { useState } from 'react';
import { useBoard } from '@domain/board/board.use-case';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardColumns } from '@data/graphql/generated/graphql';

const boardColumns = [
 { columName: 'A fazer', columnType: CardColumns.ToDo },
 { columName: 'Fazendo', columnType: CardColumns.InProgress },
 { columName: 'Review', columnType: CardColumns.InReview },
 { columName: 'Finalizado', columnType: CardColumns.Done },
] as const;

export function BoardPage() {
 const [cardsState, setCardsState] = useState<Card[]>([]);
 const { boardId } = useParams<{ boardId: string }>();
 const navigate = useNavigate();

 if (!boardId) {
  navigate('*');
 }

 const { data, loading } = useBoard({
  onCompleted: (data) => {
   setCardsState(data.board.cards);
  },
  variables: { boardId: boardId! },
 });

 const handleOnDragEnd = (result: DropResult) => {
  const { destination, source, draggableId } = result;

  if (!destination) return;

  if (destination.droppableId === source.droppableId && destination.index === source.index) {
   return;
  }

  const draggedCardId = draggableId;
  const draggedCard = cardsState.find((card) => card.id === draggedCardId);
  if (!draggedCard) return;

  const sourceColumn = source.droppableId;
  const destinationColumn = destination.droppableId as CardColumns;

  const sourceCards = cardsState.filter((card) => card.column === sourceColumn).sort((a, b) => a.order - b.order);

  const destinationCards =
   sourceColumn === destinationColumn
    ? sourceCards
    : cardsState.filter((card) => card.column === destinationColumn).sort((a, b) => a.order - b.order);

  const movedCard = {
   ...draggedCard,
   column: destinationColumn,
  };

  sourceCards.splice(source.index, 1);
  destinationCards.splice(destination.index, 0, movedCard);

  const updatedSource = sourceCards.map((card, index) => ({
   ...card,
   order: index,
  }));

  const updatedDestination = destinationCards.map((card, index) => ({
   ...card,
   order: index,
  }));

  const updatedCards = cardsState.map((card) => {
   const updated =
    updatedSource.find((cardU) => cardU.id === card.id) || updatedDestination.find((cardU) => cardU.id === card.id);
   return updated ? updated : card;
  });

  setCardsState(updatedCards);
 };

 return (
  <div className="bg-grayScale-xlight min-h-full w-full flex flex-col items-center text-start">
   <div className="w-[90%]">
    <H1 className="pt-lg">{boardStrings.title}</H1>
   </div>
   <div className="grid grid-cols-4 h-full w-[90%] gap-sm pt-md">
    <DragDropContext onDragEnd={handleOnDragEnd}>
     {boardColumns.map((type) => {
      const columnCards = cardsState
       .filter((card) => card.column === type.columnType)
       .sort((a, b) => a.order - b.order);

      return (
       <React.Fragment key={type.columnType}>
        <BoardColumn columName={type.columName} columnType={type.columnType} cards={columnCards} loading={loading} />
       </React.Fragment>
      );
     })}
    </DragDropContext>
   </div>
  </div>
 );
}
