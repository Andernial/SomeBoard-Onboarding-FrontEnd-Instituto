import { H1 } from '@atomic/atm.typography';
import { boardStrings } from './board-page.strings';
import { BoardColumn } from '@atomic/atm.board/board.component';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import React, { useState } from 'react';

const boardColumns = [
 { columName: 'A fazer', columnType: 'toDo' },
 { columName: 'Fazendo', columnType: 'inProgress' },
 { columName: 'Review', columnType: 'review' },
 { columName: 'Finalizado', columnType: 'done' },
] as const;

const cards = [
 { id: 1, name: 'card1', createdAt: '2025-01-10', columnType: 'toDo', order: 1 },
 { id: 2, name: 'card2', createdAt: '2025-01-10', columnType: 'toDo', order: 2 },
 { id: 3, name: 'card3', createdAt: '2025-01-10', columnType: 'toDo', order: 3 },
 { id: 4, name: 'teste tarefa', createdAt: '2025-01-10', columnType: 'toDo', order: 4 },
 { id: 5, name: 'card4', createdAt: '2025-01-10', columnType: 'inProgress', order: 1 },
 { id: 6, name: 'card4', createdAt: '2025-01-10', columnType: 'review', order: 6 },
];

export function BoardPage() {
 const [cardsState, setCardsState] = useState(cards);

 const onDragEnd = (result: DropResult) => {
  const { destination, source, draggableId } = result;
  if (!destination) return;

  if (destination.droppableId === source.droppableId && destination.index === source.index) {
   return;
  }

  const draggedCardId = Number(draggableId);
  const draggedCard = cardsState.find((card) => card.id === draggedCardId);
  if (!draggedCard) return;

  const sourceColumn = source.droppableId;
  const destinationColumn = destination.droppableId;

  const sourceCards = cardsState.filter((card) => card.columnType === sourceColumn).sort((a, b) => a.order - b.order);

  const destinationCards =
   sourceColumn === destinationColumn
    ? sourceCards
    : cardsState.filter((card) => card.columnType === destinationColumn).sort((a, b) => a.order - b.order);

  const movedCard = {
   ...draggedCard,
   columnType: destinationColumn,
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
    <DragDropContext onDragEnd={onDragEnd}>
     {boardColumns.map((type) => {
      const columnCards = cardsState
       .filter((card) => card.columnType === type.columnType)
       .sort((a, b) => a.order - b.order);

      return (
       <React.Fragment key={type.columnType}>
        <BoardColumn columName={type.columName} columnType={type.columnType} cards={columnCards} />
       </React.Fragment>
      );
     })}
    </DragDropContext>
   </div>
  </div>
 );
}
