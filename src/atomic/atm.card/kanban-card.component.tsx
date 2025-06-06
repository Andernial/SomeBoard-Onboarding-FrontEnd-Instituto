import clsx from 'clsx';
import { B1, B2, H4 } from '@atomic/atm.typography';
import { Draggable } from '@hello-pangea/dnd';
import placeholder from '@assets/images/placeholder-profile.png';
import editIcon from '@assets/icons/edit-bold.png';
import deleteIcon from '@assets/icons/delete.png';
import comment from '@assets/icons/edit-empty.png';
import info from '@assets/icons/information.png';
import { Card } from '@data/graphql/generated/graphql';
import { useUserStorage } from '@/app/stores/user.store';
import { useState } from 'react';
import { DeleteCard, EditCard } from '@atomic/atm.modal';

interface CardProps {
 card: Card;
 index: number;
 boardId: string;
 onClick?: () => void;
 className?: string;
}

const CardStrings = {
 title: 'Título da tarefa criada',
 comments: '0 comentários',
};

export function KanbanCard({ className, card, index, boardId }: CardProps) {
 const { name } = useUserStorage.getState();
 const [editModalOpen, setEditModalOpen] = useState(false);
 const [deleteModalOpen, setDeleteModalOpen] = useState(false);

 return (
  <>
   <Draggable draggableId={card.id} index={index}>
    {(provided) => (
     <div
      className={clsx('w-[90%] bg-grayScale-white rounded-sm flex flex-col items-center select-none', className)}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
     >
      <div className="w-[90%]">
       <div className="flex items-center justify-between pt-xs">
        <H4 className="text-start">{card.name}</H4>
        <img src={editIcon} className="size-sm inline-flex cursor-pointer" onClick={() => {setEditModalOpen(true)}} />
       </div>

       <div className="flex pt-xxs w-full justify-between items-center">
        <div className="inline-flex gap-xxs ">
         <img src={placeholder} className="size-xs mt-xxxs" />
         <B1 className="text-ellipsis overflow-hidden whitespace-nowrap">{name}</B1>
        </div>

        <div className="inline-flex">
         <img src={deleteIcon} className="size-sm cursor-pointer" onClick={() => setDeleteModalOpen(true)} />
        </div>
       </div>

       <div className="inline-flex gap-xxs py-xs">
        <div className="inline-flex gap-xxxs">
         <img src={comment} className="size-xs mt-[2px]" />
         <B2 className="text-ellipsis overflow-hidden whitespace-nowrap">{CardStrings.comments}</B2>
        </div>

        <div className="inline-flex gap-xxxs">
         <img src={info} className="size-xs mt-[2px]" />
         <B2 className="text-ellipsis overflow-hidden whitespace-nowrap">{`${new Date(
          card.createdAt,
         ).toLocaleDateString('pt-BR')}`}</B2>
        </div>
       </div>
      </div>
     </div>
    )}
   </Draggable>

   <EditCard isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} card={card} />
   <DeleteCard isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} card={card} boardId={boardId} />
  </>
 );
}
