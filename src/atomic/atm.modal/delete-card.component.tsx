import { Modal } from './modal.component';
import { H1, H2 } from '@atomic/atm.typography';
import { kanbanStrings } from '@/app/modules/kanban/kanban.page.strings';
import { Button } from '@atomic/atm.button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Card } from '@data/graphql/generated/graphql';
import { useDeleteCard } from '@domain/card/delete-card.use-case';

interface DeleteCardProps {
 card: Card;
 isOpen: boolean;
 boardId: string;
 onClose: () => void;
}

export function DeleteCard({ isOpen, onClose, card,boardId }: DeleteCardProps) {
 const [reqError, setReqError] = useState<string>();
 const { toast } = useToast();

 const { deleteCardMutation, loading } = useDeleteCard({
  onCompleted: () => {
   toast({ title: kanbanStrings.deleteTaskModal.sucessDeleted });
   onClose();
  },
  onError: (error) => {
   setReqError(error.message);
  },
  cardId: card.id,
  boardId
 });

 const handleDeleteCard = () => {
  deleteCardMutation({ variables: { cardId: card.id } });
 };

 const handleCloseModal = () => {
  onClose();
 };

 return (
  <Modal isOpen={isOpen} onClose={handleCloseModal}>
   <div className="overflow-hidden break-words p-xs max-w-lg">
    {reqError ? <H2 className="text-feedback-error-dark text-center py-xs">{reqError} </H2> : null}
    <H1 className="text-center">{kanbanStrings.deleteTaskModal.title}</H1>
    <H2 className="text-center pt-sm pb-xxs">{`${kanbanStrings.taskName} ${card.name}`}</H2>
    <div className="w-full flex justify-center gap-xs p-xs">
     <Button className="flex-1" color="primary" disabled={!!loading} onClick={handleDeleteCard}>
      {kanbanStrings.deleteTaskModal.delete}
     </Button>
     <Button className="flex-1" color="destructive" onClick={onClose} disabled={!!loading}>
      {kanbanStrings.deleteTaskModal.cancelModal}
     </Button>
    </div>
   </div>
  </Modal>
 );
}
