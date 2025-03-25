import { B1, H1, H3 } from '@atomic/atm.typography';
import { kanbanStrings } from './kanban.page.strings';
import emptyPlaceholder from '@assets/images/Empty-State.png';
import { Button } from '@atomic/atm.button';
import { useState } from 'react';

export function KanbanPage() {
 const [placeholders, setPlaceholders] = useState([]);
 return (
  <div className="bg-grayScale-xlight h-svh flex justify-center items-center text-start">
   <section>
    <H1 className="text-start pt-lg ">{kanbanStrings.title}</H1>

    <div className="bg-grayScale-white w-[1156px] min-h-[343px pb-xl pt-xl mt-md flex flex-col justify-center items-center">
    {placeholders.length ? (
     placeholders.map((item) => <p>{item}</p>)
    ) : (
     <>
      <img src={emptyPlaceholder} alt="" />
      <H3 className="pt-sm">{kanbanStrings.emptyState.title}</H3>
      <B1 className="pt-xxs">{kanbanStrings.emptyState.subTitle}</B1>
      <Button color="cta" className="mt-sm">
       {kanbanStrings.createButton}
      </Button>{' '}
     </>
    )}
    </div>
   </section>
  </div>
 );
}
