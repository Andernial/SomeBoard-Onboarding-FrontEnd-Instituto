import { B1, H1, H3, InputLabel, Link } from '@atomic/atm.typography';
import { kanbanStrings } from './kanban.page.strings';
import { useCreateBoard } from '@domain/board';
import { Button } from '@atomic/atm.button';
import React, { useState } from 'react';
import { Modal } from '@atomic/atm.modal/modal.component';
import { FormAtm } from '@atomic/obj.form/atm.form.component';
import { FormControl, FormField, FormItem } from '@components/ui/form';
import { TextInput } from '@atomic/atm.text-input';
import { ErrorCaption } from '@atomic/atm.error-caption';
import { useForm } from 'react-hook-form';
import { projectFormSchema } from '@atomic/obj.form/zod-schemas/project-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBoards } from '@domain/board/boards.use-case';
import { CardSkeleton } from '@atomic/atm.card/card.skeleton';
import z from 'zod';
import emptyPlaceholder from '@assets/images/Empty-State.png';
import addIcon from '@assets/icons/add.png';

import { BoardCard } from '@atomic/atm.card/board-card.component';
import { useToast } from '@/hooks/use-toast';

export function KanbanPage() {
 const [reqError, setReqError] = useState<string>();
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [offset, setOffSet] = useState(0);

 const { toast } = useToast();

 const form = useForm<z.infer<typeof projectFormSchema>>({
  resolver: zodResolver(projectFormSchema),
  mode: 'onChange',
  defaultValues: {
   name: '',
  },
 });

 const limit = 7;

 const { createBoardMutation } = useCreateBoard({
  onCompleted: () => {
   setOffSet(0);
   handleSucess();
  },
  onError: (data) => {
   setReqError(data.message);
  },
  limit,
 });

 const { data, loading } = useBoards({
  variables: {
   boardsPageInput: { offset, limit },
  },
 });

 const handleSubmit = (values: z.infer<typeof projectFormSchema>) => {
  const boardInput = { name: values.name };
  createBoardMutation({ variables: { boardInput } });
 };

 const handleModalClose = () => {
  setIsModalOpen(false);
 };

 const handleSucess = () => {
  form.reset();
  setIsModalOpen(false);
  toast({ title: kanbanStrings.sucessCreated });
 };

 return (
  <div className="bg-grayScale-xlight min-h-full w-full flex flex-col  items-center text-start">
   <div className="w-4/5">
    <H1 className="pt-lg">{kanbanStrings.title}</H1>
   </div>

   {loading ? (
    <div className="bg-grayScale-white py-lg px-lg my-md grid grid-cols-4 gap-sm w-4/5 justify-items-center items-center rounded-sm">
     {Array.from({ length: 8 }).map((_unused, index) => (
      <CardSkeleton key={index} />
     ))}
    </div>
   ) : (
    <>
     {data?.boards.nodes?.length ? (
      <div
       className="bg-grayScale-white py-lg px-lg my-md grid grid-cols-4 gap-sm  w-4/5 justify-items-center items-center rounded-sm"
       style={{ gridAutoRows: '1fr' }}
      >
       {data.boards.nodes.map((board, index) => (
        <React.Fragment key={board.id}>
         <BoardCard board={board} limit={limit} offset={offset} />
         {index + 1 === data.boards.nodes.length ? (
          <div
           className="w-full h-full  flex justify-center items-center gap-xxs flex-col border-2 border-grayScale-light rounded-sm cursor-pointer"
           onClick={() => setIsModalOpen(true)}
          >
           <img src={addIcon} className="size-sm" />
           <Link>{kanbanStrings.createButton}</Link>
          </div>
         ) : null}
        </React.Fragment>
       ))}
      </div>
     ) : (
      <div className="bg-grayScale-white  w-4/5 my-md h-full py-xl flex flex-col justify-center items-center rounded-md">
       <img src={emptyPlaceholder} />
       <H3 className="pt-sm">{kanbanStrings.emptyState.title}</H3>
       <B1 className="pt-xxs">{kanbanStrings.emptyState.subTitle}</B1>
       <Button color="cta" className="mt-sm" onClick={() => setIsModalOpen(true)}>
        {kanbanStrings.createButton}
       </Button>
      </div>
     )}
     <Modal isOpen={isModalOpen} onClose={() => handleModalClose()}>
      <FormAtm
       form={form}
       className="h-full flex items-center justify-center"
       onSubmit={form.handleSubmit(handleSubmit)}
      >
       <div className="flex flex-col items-center w-[400px] h-max[478px] px-xs">
        <H1>{kanbanStrings.createModal.title}</H1>
        <img src={emptyPlaceholder} alt={kanbanStrings.placeholder} className="p-sm" />
        {reqError ? <ErrorCaption className="w-11/12">{reqError}</ErrorCaption> : null}
        <>
         <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
           <FormItem>
            <InputLabel className="my-xxs">{kanbanStrings.createModal.labels.name}</InputLabel>
            <FormControl>
             <TextInput
              error={!!form.formState.errors.name}
              placeholder={kanbanStrings.createModal.labels.name}
              {...field}
             />
            </FormControl>
            {form.formState.errors.name ? <ErrorCaption>{form.formState.errors.name.message}</ErrorCaption> : null}
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
    </>
   )}
   {data?.boards.pageInfo.hasNextPage || data?.boards.pageInfo.hasPreviousPage ? (
    <div className="flex flex-row gap-sm justify-center items-center mb-sm">
     <Button
      color="secondary"
      onClick={() => setOffSet((previous) => (previous - limit < 0 ? 0 : previous - limit))}
      disabled={offset === 0}
     >
      {kanbanStrings.previous}
     </Button>
     <Button
      color="secondary"
      onClick={() => setOffSet((previous) => previous + limit)}
      disabled={!data?.boards.pageInfo.hasNextPage}
     >
      {kanbanStrings.next}
     </Button>
    </div>
   ) : null}
  </div>
 );
}
