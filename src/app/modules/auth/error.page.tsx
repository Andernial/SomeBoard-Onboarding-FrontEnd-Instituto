import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { LinkButton } from '@atomic/atm.button';
import { errorPageStrings } from './error.page.strings';

function ErrorPage() {
 const error = useRouteError();

 return (
  <div>
   <h1>{errorPageStrings.errorMessage}</h1>
   <h2>{isRouteErrorResponse(error) ? error.statusText : null}</h2>
   <LinkButton pathname='/login'>voltar para tela de login</LinkButton>
  </div>
 );
}

export default ErrorPage;
