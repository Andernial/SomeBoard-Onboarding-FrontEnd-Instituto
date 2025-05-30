import { Modal } from './modal.component';
import { H1, InputLabel } from '@atomic/atm.typography';
import { kanbanStrings } from '@/app/modules/kanban/kanban.page.strings';
import { Button } from '@atomic/atm.button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { FormAtm } from '@atomic/obj.form/atm.form.component';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@data/graphql/generated/graphql';
import { taskFormSchema } from '@atomic/obj.form/zod-schemas/task-form-schema';
import z from 'zod';
import { ErrorCaption } from '@atomic/atm.error-caption';
import { FormControl, FormField, FormItem } from '@components/ui/form';
import { TextInput } from '@atomic/atm.text-input';
import { useUpdateCard } from '@domain/card/update-card.use-case';

interface EditBoardProps {
 card: Card;
 isOpen: boolean;
 onClose: () => void;
}

export function EditCard({ isOpen, onClose, card }: EditBoardProps) {
 const [reqError, setReqError] = useState<string>();
 const { toast } = useToast();

 const { updateCardMutation, loading } = useUpdateCard({
  onCompleted: () => {
   editForm.reset({ name: card.name });
   toast({ title: kanbanStrings.editTaskModal.sucessEdited });
   onClose();
  },
  onError: (error) => {
   setReqError(error.message);
  },
 });

 const handleUpdateCardSubmit = (values: z.infer<typeof taskFormSchema>) => {
  const updateCardData = { ...values, id: card.id, column: card.column };

  updateCardMutation({ variables: { updateCardData } });
 };

 const handleCloseModal = () => {
  editForm.clearErrors();
  onClose();
 };

 const editForm = useForm<z.infer<typeof taskFormSchema>>({
  resolver: zodResolver(taskFormSchema),
  mode: 'onChange',
  defaultValues: { name: card.name },
 });

 return (
  <Modal isOpen={isOpen} onClose={handleCloseModal}>
   <FormAtm
    form={editForm}
    className="h-full flex items-center justify-center"
    onSubmit={editForm.handleSubmit(handleUpdateCardSubmit)}
   >
    <div className="flex flex-col items-center w-[400px] h-max[478px] px-xs">
     <H1>{kanbanStrings.editTaskModal.title}</H1>
     {reqError ? <ErrorCaption className="w-11/12">{reqError}</ErrorCaption> : null}
     <>
      <FormField
       control={editForm.control}
       name="name"
       render={({ field }) => (
        <FormItem>
         <InputLabel className="my-xxs">{kanbanStrings.editTaskModal.labels.name}</InputLabel>
         <FormControl>
          <TextInput
           error={!!editForm.formState.errors.name}
           placeholder={kanbanStrings.editTaskModal.labels.name}
           {...field}
          />
         </FormControl>
         {editForm.formState.errors.name ? <ErrorCaption>{editForm.formState.errors.name.message}</ErrorCaption> : null}
        </FormItem>
       )}
      />
      <Button type="submit" className="w-full mt-md mb-md" color="primary" disabled={!!loading}>
       {kanbanStrings.createModal.create}
      </Button>
     </>
    </div>
   </FormAtm>
  </Modal>
 );
}
