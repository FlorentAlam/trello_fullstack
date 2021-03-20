import { FunctionComponent, MouseEvent } from "react";

interface IFormProps{
    buttonName: string,
    submitAction: ()=>void
}

const Form: FunctionComponent<IFormProps> = ({buttonName, submitAction, children}) => {
    const onSubmit = (event: MouseEvent) => {
        event.preventDefault();
        submitAction();
    }

    return (
    <form>
        { children }
        <button type="submit" onClick={ onSubmit }>{ buttonName }</button>
    </form>
)};

export default Form;