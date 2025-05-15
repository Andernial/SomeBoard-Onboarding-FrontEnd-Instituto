import { Card } from './card.component';
import deleteIcon from '@assets/icons/delete.png';
import cardPlaceHolder from '@assets/images/card-placeholder.png';
import editModalIcon from '@assets/icons/edit-bold.png';
import { useState } from 'react';
import { B1, H1 } from '@atomic/atm.typography';
import { kanbanStrings } from '@/app/modules/kanban/kanban.page.strings';
import { EditBoard } from '@atomic/atm.modal/edit-board.component';
import { Board } from '@data/graphql/generated/graphql';
import { DeleteBoard } from '@atomic/atm.modal/delete-board.component';
import { useNavigate } from 'react-router-dom';
import { AuthRoutes } from '@/app/modules/auth/auth.routes';

interface BoardCardProps {
 board: Board;
 limit: number;
 offset: number;
}

export function BoardCard({ board, limit, offset }: BoardCardProps) {
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

 const navigate = useNavigate();

 const handleClick = () => {
  navigate(`${AuthRoutes.BOARD.replace(':boardId', board.id)}`);
 };

 const handleOpenEditModal = (e: React.MouseEvent) => {
  e.stopPropagation();
  setIsEditModalOpen(true);
 };

 const handleOpenDeleteModal = (e: React.MouseEvent) => {
  e.stopPropagation();
  setIsDeleteModalOpen(true);
 };

 return (
  <>
   <Card onClick={handleClick}>
    <div className="relative h-1/2 w-full">
     <img src={cardPlaceHolder} className="rounded-t-sm h-full w-full object-cover" />

     <button
      className="absolute top-xs right-xs bg-grayScale-white cursor-pointer rounded-xs"
      onClick={handleOpenEditModal}
     >
      <img src={editModalIcon} alt={kanbanStrings.editModal.edit} />
     </button>

     <button
      className="absolute top-[50px] right-xs bg-grayScale-white cursor-pointer rounded-xs"
      onClick={handleOpenDeleteModal}
     >
      <img src={deleteIcon} alt={kanbanStrings.deleteModal.delete} />
     </button>
    </div>
    <H1 className="px-sm pt-sm overflow-hidden text-ellipsis whitespace-nowrap">{board.name}</H1>
    <B1 className="pt-xxs px-sm pb-lg">{kanbanStrings.createdAt}</B1>
   </Card>

   <EditBoard isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} board={board} />
   <DeleteBoard
    isOpen={isDeleteModalOpen}
    limit={limit}
    offset={offset}
    onClose={() => setIsDeleteModalOpen(false)}
    board={board}
   />
  </>
 );
}
