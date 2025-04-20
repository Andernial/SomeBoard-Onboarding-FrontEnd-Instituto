import { B1, H1, H3, InputLabel, Link } from '@atomic/atm.typography';
import { kanbanStrings } from './kanban.page.strings';
import { useCreateBoard } from '@domain/board';
import { Button } from '@atomic/atm.button';
import React, { useRef, useState } from 'react';
import { Modal } from '@atomic/atm.modal/modal.component';
import { FormAtm } from '@atomic/obj.form/atm.form.component';
import { FormControl, FormField, FormItem } from '@components/ui/form';
import { TextInput } from '@atomic/atm.text-input';
import { ErrorCaption } from '@atomic/atm.error-caption';
import { useForm } from 'react-hook-form';
import { editProjectFormSchema, projectFormSchema } from '@atomic/obj.form/zod-schemas/project-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBoards } from '@domain/board/boards.use-case';
import { Card } from '@atomic/atm.card';
import { CardSkeleton } from '@atomic/atm.card/card.skeleton';
import z from 'zod';
import sucessIcon from '@assets/icons/sucess.png';
import emptyPlaceholder from '@assets/images/Empty-State.png';
import addIcon from '@assets/icons/add.png';

import cardPlaceHolder from '@assets/images/card-placeholder.png';
import editModalIcon from '@assets/icons/edit-bold.png';
import { Board } from '@data/graphql/generated/graphql';
import { useUpdateBoard } from '@domain/board/update-board.use-case';

export function KanbanPage() {
 const [reqError, setReqError] = useState<string>();
 const [reqSucess, setReqSucess] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const [offset, setOffSet] = useState(0);
 const timeoutRef = useRef<number | null>(null);

 const form = useForm<z.infer<typeof projectFormSchema>>({
  resolver: zodResolver(projectFormSchema),
  mode: 'onChange',
  defaultValues: {
   name: '',
  },
 });

 const editForm = useForm<z.infer<typeof editProjectFormSchema>>({
  resolver: zodResolver(editProjectFormSchema),
  mode: 'onChange',
  defaultValues: {
   name: '',
   id: '',
  },
 });

 const limit = 7;

 const { updateBoardMutation, loading: updateBoardLoading } = useUpdateBoard({
  onCompleted: (data) => {
   handleSucess();
   console.log(data);
  },

  onError: (data) => {
   setReqError(data.message);
  },
 });

 const { createBoardMutation } = useCreateBoard({
  onCompleted: (data) => {
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

 const handleEditProjectSubmit = (values: z.infer<typeof editProjectFormSchema>) => {
  const updateBoardData = { id: values.id, name: values.name };
  updateBoardMutation({ variables: { updateBoardData } });
 };

 const handleSucess = () => {
  setReqSucess(true);
  form.reset();
  editForm.reset();

  timeoutRef.current = window.setTimeout(() => {
   setIsEditModalOpen(false);
   setIsModalOpen(false);
   setReqSucess(false);
  }, 2500);
 };

 const handleModalClose = () => {
  if (timeoutRef.current) {
   clearTimeout(timeoutRef.current);
   timeoutRef.current = null;
  }
  setIsModalOpen(false);
  setReqSucess(false);
 };

 const handleOpenEditModal = (board: Board) => {
  editForm.reset({ name: board.name, id: board.id });
  setIsEditModalOpen(true);
 };

 const handleEditModalClose = () => {
  if (timeoutRef.current) {
   clearTimeout(timeoutRef.current);
   timeoutRef.current = null;
  }
  setIsEditModalOpen(false);
  setReqSucess(false);
 };

 const handleInputFocus = () => {
  setReqError('');
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
        <React.Fragment key={index}>
         <Card>
          <div className="relative h-1/2 w-full">
           <img src={cardPlaceHolder} className="rounded-t-sm h-full w-full object-cover" />

           <button
            className="absolute top-xs right-xs bg-grayScale-white cursor-pointer rounded-xs"
            onClick={() => {
             handleOpenEditModal(board);
            }}
           >
            <img src={editModalIcon} alt="editar" />
           </button>
          </div>
          <H1 className="px-sm pt-sm overflow-hidden text-ellipsis whitespace-nowrap">{board.name}</H1>
          <B1 className="pt-xxs px-sm pb-lg">{kanbanStrings.createdAt}</B1>
         </Card>
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
       onChange={handleInputFocus}
      >
       <div className="flex flex-col items-center w-[400px] h-max[478px] px-xs">
        <H1>{!reqSucess ? kanbanStrings.createModal.title : kanbanStrings.sucessCreated}</H1>
        <img src={!reqSucess ? emptyPlaceholder : sucessIcon} alt="placeholder" className="p-sm" />
        {reqError ? <ErrorCaption className="w-11/12">{reqError}</ErrorCaption> : null}

        {!reqSucess ? (
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
        ) : null}
       </div>
      </FormAtm>
     </Modal>

     <Modal isOpen={isEditModalOpen} onClose={() => handleEditModalClose()}>
      <FormAtm
       form={editForm}
       className="h-full flex items-center justify-center"
       onSubmit={editForm.handleSubmit(handleEditProjectSubmit)}
       onChange={handleInputFocus}
      >
       <div className="flex flex-col items-center w-[400px] h-max[478px] px-xs">
        <H1>{!reqSucess ? kanbanStrings.editModal.title : kanbanStrings.editModal.sucessEdited}</H1>
        <img src={!reqSucess ? emptyPlaceholder : sucessIcon} alt="placeholder" className="p-sm" />
        {reqError ? <ErrorCaption className="w-11/12">{reqError}</ErrorCaption> : null}

        {!reqSucess ? (
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
             {editForm.formState.errors.name ? (
              <ErrorCaption>{editForm.formState.errors.name.message}</ErrorCaption>
             ) : null}
            </FormItem>
           )}
          />
          <Button type="submit" className="w-full mt-md mb-md" color="primary" disabled={!!updateBoardLoading}>
           {kanbanStrings.editModal.edit}
          </Button>
         </>
        ) : null}
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
