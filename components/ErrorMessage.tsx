import { FunctionComponent } from "react";

interface IErrorProps{
    message: string
}

const ErrorMessage:FunctionComponent<IErrorProps> = ({ message }) => (
    <p>
        { message }
    </p>
);

export default ErrorMessage;