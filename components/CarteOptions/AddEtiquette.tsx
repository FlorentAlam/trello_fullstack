import axios from "axios";
import { FunctionComponent } from "react";
import { FaTimes } from "react-icons/fa";
import { CREATE_ETIQUETTE } from "../../utils/api_endpoints";
import AddElementPopup from "./AddElementPopup";
import { IEtiquette } from "./Etiquettes";

const COLORS = ["#ffe018", "#990000", "#FF7F50", "#9ACD32", "#4682B4", "#BA55D3"];

interface IAddEtiquetteProps{
    onAdd: (etiquette: IEtiquette) => void,
    carte_id: number,
    onClose: () => void
}

const AddEtiquette: FunctionComponent<IAddEtiquetteProps> = ({ carte_id, onAdd, onClose }) => {
    const onAddEtiquette = async (color: string) => {
        const etiquette:IEtiquette = {
            carte_id,
            name: '',
            color
        }

        let response = await axios.post(CREATE_ETIQUETTE, {...etiquette}, { withCredentials: true});
        onAdd({...etiquette, id: response.data[0]});
        onClose();
    }

    return (
        <AddElementPopup name="étiquettes" className="add-etiquette" onClose={onClose}>
            <div>
                <ul>
                    { COLORS.map((color, index) => (
                        <li key={index} style={{ backgroundColor: color}} onClick={() => onAddEtiquette(color)}></li>
                    ))}
                </ul>
            </div>
        </AddElementPopup>
    )
};

export default AddEtiquette;