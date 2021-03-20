import { ChangeEvent, FunctionComponent } from "react";

interface IFieldsetProps{
    name: string,
    label: string,
    type: string,
    value: string,
    onChange: (event:ChangeEvent<HTMLInputElement>)=>void,
    placeholder ?: string,
    autocomplete ?: string
}

const Fieldset: FunctionComponent<IFieldsetProps>  = ({ name, label, type, value, onChange, placeholder = "", autocomplete = "off" }) => (
    <>
        <label htmlFor={ name }>{ label }</label>
        <input 
            type={ type } 
            name={ name } 
            id={ name } 
            value={ value } 
            onChange={ onChange } 
            placeholder={ placeholder }
            autoComplete={ autocomplete }
        />
    </>
);

export default Fieldset;