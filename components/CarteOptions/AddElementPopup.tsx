import { FunctionComponent } from "react";
import { FaTimes } from "react-icons/fa";

interface IAddElementProps{
    name: string,
    className: string,
    onClose: () => void
}

const AddElementPopup: FunctionComponent<IAddElementProps> = ({name, className, children, onClose}) => {


    return(
        <div className={className}>
            <FaTimes className="add-checklist__close" role="button" onClick={ onClose }/>
            <h2>{name}</h2>
            <hr/>
            {children}
        </div>
    )
}

export default AddElementPopup;