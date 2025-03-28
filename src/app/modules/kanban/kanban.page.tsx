import { B1, H1, H3, InputLabel } from '@atomic/atm.typography';
import { kanbanStrings } from './kanban.page.strings';
import { useCreateBoard } from '@domain/board';
import { Button } from '@atomic/atm.button';
import { useState } from 'react';
import { Modal } from '@atomic/atm.modal/modal.component';
import { FormAtm } from '@atomic/obj.form/atm.form.component';
import { FormControl, FormField, FormItem } from '@components/ui/form';
import { TextInput } from '@atomic/atm.text-input';
import { ErrorCaption } from '@atomic/atm.error-caption';
import { useForm } from 'react-hook-form';
import { projectFormSchema } from '@atomic/obj.form/zod-schemas/project-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import sucessIcon from '@assets/icons/sucess.png';
import emptyPlaceholder from '@assets/images/Empty-State.png';

export function KanbanPage() {
 const [placeholders, setPlaceholders] = useState([]);
 const [reqError, setReqError] = useState<string>();
 const [reqSucess, setReqSucess] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);

 const form = useForm<z.infer<typeof projectFormSchema>>({
  resolver: zodResolver(projectFormSchema),
  mode: 'onChange',
  defaultValues: {
   name: '',
  },
 });

 const { createBoardMutation, loading } = useCreateBoard({
  onCompleted: (data) => {
   console.log(data);
   handleSucess();
  },
  onError: (data) => {
   setReqError(data.message);
  },
 });

 const handleSubmit = (values: z.infer<typeof projectFormSchema>) => {
  const boardInput = { name: values.name };
  createBoardMutation({ variables: { boardInput } });
 };

 const handleSucess = () => {
  setReqSucess(true);

  setTimeout(() => {
   setIsModalOpen(false);
   setReqSucess(false);
  }, 5000);
 };

 const handleInputFocus = () => {
  setReqError('');
 };

 return (
  <div className="bg-grayScale-xlight min-h-full w-full flex flex-col  items-center text-start">
      <div className="w-4/5">
    <H1 className="pt-lg">{kanbanStrings.title}</H1>
  </div>
    <div className="bg-grayScale-white  h-2/3 pb-xl pt-xl my-md flex flex-col justify-center w-4/5 items-center rounded-md">
     {placeholders.length ? (
      placeholders.map((item) => <p>{item}</p>)
     ) : (
      <>
       <img src={emptyPlaceholder} alt="" />
       <H3 className="pt-sm">{kanbanStrings.emptyState.title}</H3>
       <B1 className="pt-xxs">{kanbanStrings.emptyState.subTitle}</B1>
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)}>
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
            {' '}
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
       <Button color="cta" className="mt-sm" onClick={() => setIsModalOpen(true)}>
        {kanbanStrings.createButton}
       </Button>
      </>
     )}
    </div>
  </div>
 );
}
