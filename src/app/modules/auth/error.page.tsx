import { isRouteErrorResponse, useRouteError } from "react-router-dom"

function ErrorPage(){

    const error = useRouteError();

    console.log(error);

    return(
        <div>
            <h1>Ocorreu um erro!!!!</h1>
            <h2>{isRouteErrorResponse(error) ? error.statusText : null }</h2>
        </div>
    )
}



export default ErrorPage
