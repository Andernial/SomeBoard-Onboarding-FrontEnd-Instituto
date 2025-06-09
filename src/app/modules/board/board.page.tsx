import { H1 } from '@atomic/atm.typography';
import { boardStrings } from './board-page.strings';
import { BoardColumn } from '@atomic/atm.board/board.component';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import React, { useState } from 'react';
import { useBoard } from '@domain/board/board.use-case';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardColumns } from '@data/graphql/generated/graphql';
import { useUpdateCard } from '@domain/card/update-card.use-case';
import { toast } from '@/hooks/use-toast';
import { useCardStorage } from '@/app/stores/kanbam/card.store';
import { useUpdateCardOrder } from '@domain/card/update-card-order.use-case';

const boardColumns = [
 { columName: 'A fazer', columnType: CardColumns.ToDo },
 { columName: 'Fazendo', columnType: CardColumns.InProgress },
 { columName: 'Review', columnType: CardColumns.InReview },
 { columName: 'Finalizado', columnType: CardColumns.Done },
] as const;

export function BoardPage() {
 const { boardId } = useParams<{ boardId: string }>();
 const [sourcePreviousState, setSourcePreviousState] = useState<Card[]>();
 const navigate = useNavigate();

 if (!boardId) {
  navigate('*');
 }

 const { loading } = useBoard({
  variables: { boardId: boardId! },
 });

 const { cards, setCards } = useCardStorage();

 const { updateCardMutation } = useUpdateCard({
  onError: (error) => {
   toast({ title: error.message, variant: 'error' });
   setCards(sourcePreviousState!);
  },
 });

 const { updateCardOrderMutation } = useUpdateCardOrder({
  onError: (error) => {
   toast({ title: error.message, variant: 'error' });
   setCards(sourcePreviousState!);
  },
 });

 const handleCardColumnUpdate = (input: { card: Card; newColumn?: CardColumns; newOrder?: number }) => {
  const { card, newColumn } = input;
  const updateCardData = { column: newColumn, id: card.id, name: card.name };

  updateCardMutation({ variables: { updateCardData } });
 };

 const handleUpdateCardOrder = (updatedCards: Card[]) => {
  const updateCardOrderData = updatedCards.map((card) => ({ id: card.id, order: card.order }));
  updateCardOrderMutation({ variables: { updateCardOrderData } });
 };

 const handleOnDragEnd = (result: DropResult) => {
  const { destination, source, draggableId } = result;

  if (!destination) return;

  if (destination.droppableId === source.droppableId && destination.index === source.index) {
   return;
  }

  const draggedCardId = draggableId;
  const draggedCard = cards.find((card) => card.id === draggedCardId);
  if (!draggedCard) return;

  const sourceColumn = source.droppableId;
  const destinationColumn = destination.droppableId as CardColumns;

  setSourcePreviousState(cards)

  if (destinationColumn !== sourceColumn) {
   handleCardColumnUpdate({ card: draggedCard, newColumn: destinationColumn });
  }

  const sourceCards = cards.filter((card) => card.column === sourceColumn).sort((a, b) => a.order - b.order);

  const destinationCards =
   sourceColumn === destinationColumn
    ? sourceCards
    : cards.filter((card) => card.column === destinationColumn).sort((a, b) => a.order - b.order);

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

  const updatedCards = cards.map((card) => {
   const updated =
    updatedSource.find((cardU) => cardU.id === card.id) || updatedDestination.find((cardU) => cardU.id === card.id);

   return updated ? updated : card;
  });

  const changedCards = updatedCards.filter((updated) => {
   const sameCard = cards.find((filteredCard) => filteredCard.id === updated.id);

   return sameCard && sameCard.order !== updated.order;
  });

  handleUpdateCardOrder(changedCards);
  setCards(updatedCards);
 };

 return (
  <div className="bg-grayScale-xlight min-h-full w-full flex flex-col items-center text-start">
   <div className="w-[90%]">
    <H1 className="pt-lg">{boardStrings.title}</H1>
   </div>
   <div className="grid grid-cols-4 h-full w-[90%] gap-sm pt-md">
    <DragDropContext onDragEnd={handleOnDragEnd}>
     {boardColumns.map((type) => {
      const columnCards =
       cards.filter((card) => card.column === type.columnType).sort((a, b) => a.order - b.order) ?? [];

      return (
       <React.Fragment key={type.columnType}>
        <BoardColumn
         columName={type.columName}
         columnType={type.columnType}
         cards={columnCards}
         loading={loading}
         id={boardId!}
        />
       </React.Fragment>
      );
     })}
    </DragDropContext>
   </div>
  </div>
 );
}
