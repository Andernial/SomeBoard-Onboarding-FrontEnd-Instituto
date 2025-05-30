import { BoardLabel } from '@atomic/atm.board-label/board-label.component';
import { Link } from '@atomic/atm.typography';
import { boardStrings } from '@/app/modules/board/board-page.strings';
import moreIcon from '@assets/icons/more.png';
import addIcon from '@assets/icons/add.png';
import { Droppable } from '@hello-pangea/dnd';
import { KanbanCard } from '@atomic/atm.card/kanban-card.component';
import { Card, CardColumns } from '@data/graphql/generated/graphql';
import { ColumnCardSkeleton } from '@atomic/atm.card/column-card.skeleton';
import { useState } from 'react';
import { CreateCard } from '@atomic/atm.modal';

interface BoardProps {
 id: string;
 columName: string;
 columnType: CardColumns;
 cards: Card[];
 loading: boolean;
}

export function BoardColumn({ columName, columnType, cards, loading, id }: BoardProps) {
 const [createModalOpen, setCreateModalOpen] = useState(false);

 return (
  <div className="flex items-center flex-col h-[70vh] max-h-[660px] bg-grayScale-white rounded-md">
   <div className="w-[87%] mt-sm inline-flex items-center justify-between select-none">
    <BoardLabel color={columnType}>{columName}</BoardLabel>
    <img src={moreIcon} className="size-sm" />
   </div>
   {loading ? (
    <div className="bg-grayScale-xlight w-[90%] h-3/4 flex flex-col items-center rounded-sm mt-sm overflow-y-auto p-xxs">
     {Array.from({ length: 3 }).map((_unused, index) => (
      <ColumnCardSkeleton key={index} />
     ))}
    </div>
   ) : (
    <Droppable droppableId={columnType}>
     {(provided) => (
      <div
       className="bg-grayScale-xlight w-[90%] h-3/4 flex flex-col items-center rounded-sm mt-sm overflow-y-auto p-xxs"
       ref={provided.innerRef}
       {...provided.droppableProps}
      >
       {cards.map((card, index) => (
        <KanbanCard card={card} key={card.id} index={index} className="mt-xxs" />
       ))}
       {provided.placeholder}
      </div>
     )}
    </Droppable>
   )}

   <CreateCard
    isOpen={createModalOpen}
    onClose={() => setCreateModalOpen(false)}
    column={columnType}
    id={id}
    order={cards.map((card) => card.order)}
   />

   <div
    className="inline-flex justify-center items-center gap-xxs py-sm border-grayScale-light rounded-sm cursor-pointer select-none"
    onClick={() => setCreateModalOpen(true)}
   >
    <img src={addIcon} className="size-sm pb-[2px]" />
    <Link>{boardStrings.createTask}</Link>
   </div>
  </div>
 );
}
