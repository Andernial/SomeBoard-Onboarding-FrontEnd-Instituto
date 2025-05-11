import { Board } from '@data/graphql/generated/graphql';
import { Modal } from './modal.component';
import { H1, H2 } from '@atomic/atm.typography';
import { kanbanStrings } from '@/app/modules/kanban/kanban.page.strings';
import { Button } from '@atomic/atm.button';
import { useDeleteBoard } from '@domain/board/delete-board.use-case';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface DeleteBoardProps {
 board: Board;
 isOpen: boolean;
 limit: number;
 offset: number;
 onClose: () => void;
}

export function DeleteBoard({ isOpen, onClose, board, limit, offset }: DeleteBoardProps) {
 const [reqError, setReqError] = useState<string>();
 const { toast } = useToast();

 const { deleteBoardMutation, loading } = useDeleteBoard({
  onCompleted: () => {
   onClose();
   toast({ title: kanbanStrings.deleteModal.sucessDeleted });
  },

  onError: (data) => {
   setReqError(data.message);
  },
  limit,
  offset,
 });

 const handleDeleteBoard = () => {
    
  deleteBoardMutation({ variables: { boardId: board.id } });
 };

 return (
  <Modal isOpen={isOpen} onClose={onClose}>
   <div className="overflow-hidden break-words p-xs max-w-lg">
    {reqError ? <H2 className="text-feedback-error-dark text-center py-xs">{reqError} </H2> : null}
    <H1 className="text-center">{kanbanStrings.deleteModal.title}</H1>
    <H2 className="text-center pt-sm pb-xxs">{`${kanbanStrings.projectName} ${board.name}`}</H2>
    <div className="w-full flex justify-center gap-xs p-xs">
     <Button className="flex-1" color="primary" onClick={handleDeleteBoard} disabled={!!loading}>
      {kanbanStrings.deleteModal.delete}
     </Button>
     <Button className="flex-1" color="destructive" onClick={onClose} disabled={!!loading}>
      {kanbanStrings.deleteModal.cancelModal}
     </Button>
    </div>
   </div>
  </Modal>
 );
}
