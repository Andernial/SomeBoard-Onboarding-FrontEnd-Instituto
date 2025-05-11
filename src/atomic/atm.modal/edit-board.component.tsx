import { FormAtm } from '@atomic/obj.form/atm.form.component';
import { Modal } from './modal.component';
import { editProjectFormSchema } from '@atomic/obj.form/zod-schemas/project-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useUpdateBoard } from '@domain/board/update-board.use-case';
import { kanbanStrings } from '@/app/modules/kanban/kanban.page.strings';
import { ErrorCaption } from '@atomic/atm.error-caption';
import { H1, InputLabel } from '@atomic/atm.typography';
import emptyPlaceholder from '@assets/images/Empty-State.png';
import z from 'zod';
import { FormControl, FormField, FormItem } from '@components/ui/form';
import { TextInput } from '@atomic/atm.text-input';
import { Button } from '@atomic/atm.button';
import { Board } from '@data/graphql/generated/graphql';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface EditBoardProps {
 board: Board;
 isOpen: boolean;
 onClose: () => void;
}

export function EditBoard({ isOpen, onClose, board }: EditBoardProps) {
 const [reqError, setReqError] = useState<string>();
 const { toast } = useToast();

 const { updateBoardMutation, loading: updateBoardLoading } = useUpdateBoard({
  onCompleted: () => {
   onClose();
   toast({ title: kanbanStrings.editModal.sucessEdited });
  },

  onError: (data) => {
   setReqError(data.message);
  },
 });

 const editForm = useForm<z.infer<typeof editProjectFormSchema>>({
  resolver: zodResolver(editProjectFormSchema),
  mode: 'onChange',
  defaultValues: board,
 });

 const handleEditProjectSubmit = (values: z.infer<typeof editProjectFormSchema>) => {
  const updateBoardData = { id: values.id, name: values.name };
  updateBoardMutation({ variables: { updateBoardData } });
 };

 return (
  <Modal isOpen={isOpen} onClose={onClose}>
   <FormAtm
    form={editForm}
    className="h-full flex items-center justify-center"
    onSubmit={editForm.handleSubmit(handleEditProjectSubmit)}
   >
    <div className="flex flex-col items-center w-[400px] h-max[478px] px-xs">
     <H1>{kanbanStrings.editModal.title}</H1>
     <img src={emptyPlaceholder} alt="placeholder" className="p-sm" />
     {reqError ? <ErrorCaption className="w-11/12">{reqError}</ErrorCaption> : null}
     <>
      <FormField
       control={editForm.control}
       name="name"
       render={({ field }) => (
        <FormItem>
         <InputLabel className="my-xxs">{kanbanStrings.createModal.labels.name}</InputLabel>
         <FormControl>
          <TextInput
           error={!!editForm.formState.errors.name}
           placeholder={kanbanStrings.createModal.labels.name}
           {...field}
          />
         </FormControl>
         {editForm.formState.errors.name ? <ErrorCaption>{editForm.formState.errors.name.message}</ErrorCaption> : null}
        </FormItem>
       )}
      />
      <Button type="submit" className="w-full mt-md mb-md" color="primary" disabled={!!updateBoardLoading}>
       {kanbanStrings.editModal.edit}
      </Button>
     </>
    </div>
   </FormAtm>
  </Modal>
 );
}
