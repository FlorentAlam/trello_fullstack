import axios from "axios";
import { ChangeEvent, FunctionComponent, useContext, useState } from "react"
import { FaTimes } from "react-icons/fa";
import { MainContext } from "../../pages/_app";
import { CREATE_CHECKLIST } from "../../utils/api_endpoints";
import AddElementPopup from "./AddElementPopup";
import { IChecklist } from "./Checklist";


interface IAddChecklistProps{
    carte_id: number,
    onAdd: (checklist: IChecklist) => void,
    onClose: () => void
}

const AddChecklist: FunctionComponent<IAddChecklistProps> = ({ carte_id, onAdd, onClose }) => {
    const [ titre, setTitre ] = useState('');

    const { ctx, toggleContext } = useContext(MainContext);

    const onAddChecklist = async () => {
        const checklist: IChecklist = {
            carte_id,
            name: titre,
            isChecked: false
        }
        try{
            if(titre.length < 1) throw new Error("Veuillez spécifier un titre pour votre checklist");
            let response = await axios.post(CREATE_CHECKLIST, {...checklist}, { withCredentials: true});
            onAdd({...checklist, id: response.data[0]});
            onClose();
        } catch(e){
            toggleContext({...ctx, flash: {isError: true, message: e.message}});
        }
    }

    return (
        <AddElementPopup name="Ajouter une checklist" className="add-checklist" onClose={onClose}>
            <div className="add-checklist__input-field">
                <label htmlFor="titre">Titre</label>
                <input type="text" name="titre" id="titre" value={titre} onChange={(event:ChangeEvent<HTMLInputElement>) => { setTitre(event.target.value) }}/>
            </div>
            <button onClick={onAddChecklist}>Ajouter</button>
        </AddElementPopup>
    )
}

export default AddChecklist;