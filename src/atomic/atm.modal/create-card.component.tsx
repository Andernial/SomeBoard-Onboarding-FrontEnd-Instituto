import { Modal } from './modal.component';
import { H1, InputLabel } from '@atomic/atm.typography';
import { kanbanStrings } from '@/app/modules/kanban/kanban.page.strings';
import { Button } from '@atomic/atm.button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { FormAtm } from '@atomic/obj.form/atm.form.component';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardColumns } from '@data/graphql/generated/graphql';
import { taskFormSchema } from '@atomic/obj.form/zod-schemas/task-form-schema';
import z from 'zod';
import { ErrorCaption } from '@atomic/atm.error-caption';
import { FormControl, FormField, FormItem } from '@components/ui/form';
import { TextInput } from '@atomic/atm.text-input';
import { useCreateCard } from '@domain/card/create-card.use-case';

interface CreateBoardProps {
 id: string;
 column: CardColumns;
 order: number[];
 isOpen: boolean;
 onClose: () => void;
}

export function CreateCard({ isOpen, onClose, id, column, order }: CreateBoardProps) {
 const [reqError, setReqError] = useState<string>();
 const { toast } = useToast();

 const { createCardMutation, loading } = useCreateCard({
  onCompleted: () => {
   toast({ title: kanbanStrings.createTaskModal.sucessCreated });
   onClose();
  },
  onError: (error) => {
   setReqError(error.message);
  },
  boardId: id,
 });

 const handleCreateCardSubmit = (values: z.infer<typeof taskFormSchema>) => {
  const newOrder =
   order.length > 1 ? order.reduce((current, previous) => (current > previous ? current : previous)) + 1 : 0;

  const cardData = { ...values, boardId: id, column, order: newOrder };

  createCardMutation({ variables: { cardData } });
  createForm.reset();
 };

 const handleCloseModal = () =>{
    createForm.clearErrors()
    onClose()
 }

 const createForm = useForm<z.infer<typeof taskFormSchema>>({
  resolver: zodResolver(taskFormSchema),
  mode: 'onChange',
  defaultValues: { name: '' },
 });

 return (
  <Modal isOpen={isOpen} onClose={handleCloseModal}>
   <FormAtm
    form={createForm}
    className="h-full flex items-center justify-center"
    onSubmit={createForm.handleSubmit(handleCreateCardSubmit)}
   >
    <div className="flex flex-col items-center w-[400px] h-max[478px] px-xs">
     <H1>{kanbanStrings.createTaskModal.title}</H1>
     {reqError ? <ErrorCaption className="w-11/12">{reqError}</ErrorCaption> : null}
     <>
      <FormField
       control={createForm.control}
       name="name"
       render={({ field }) => (
        <FormItem>
         <InputLabel className="my-xxs">{kanbanStrings.createTaskModal.labels.name}</InputLabel>
         <FormControl>
          <TextInput
           error={!!createForm.formState.errors.name}
           placeholder={kanbanStrings.createTaskModal.labels.name}
           {...field}
          />
         </FormControl>
         {createForm.formState.errors.name ? (
          <ErrorCaption>{createForm.formState.errors.name.message}</ErrorCaption>
         ) : null}
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
