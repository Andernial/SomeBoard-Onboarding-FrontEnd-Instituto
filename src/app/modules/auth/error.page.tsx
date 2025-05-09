import { LinkButton } from '@atomic/atm.button';
import { errorPageStrings } from './error.page.strings';

function ErrorPage() {
  return (
    <div>
      <h1>{errorPageStrings.errorMessage}</h1>
      <LinkButton pathname="/login">{errorPageStrings.linkButton}</LinkButton>
    </div>
  );
}

export default ErrorPage;
