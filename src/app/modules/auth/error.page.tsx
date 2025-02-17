import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { LinkButton } from '@atomic/atm.button';

function ErrorPage() {
 const error = useRouteError();

 return (
  <div>
   <h1>Ocorreu um erro!!!!</h1>
   <h2>{isRouteErrorResponse(error) ? error.statusText : null}</h2>
   <LinkButton pathname='/login' color='link'>voltar para tela de login</LinkButton>
  </div>
 );
}

export default ErrorPage;
