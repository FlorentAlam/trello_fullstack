import axios from "axios";
import { FunctionComponent } from "react";
import { CREATE_ETIQUETTE } from "../../utils/api_endpoints";
import { IEtiquette } from "./Etiquettes";

const COLORS = ["#ffe018", "#990000", "#FF7F50", "#9ACD32", "#4682B4", "#BA55D3"];

interface IAddEtiquetteProps{
    onAdd: (etiquette: IEtiquette) => void,
    carte_id: number
}

const AddEtiquette: FunctionComponent<IAddEtiquetteProps> = ({ carte_id, onAdd }) => {
    const onAddEtiquette = async (color: string) => {
        const etiquette:IEtiquette = {
            carte_id,
            name: '',
            color
        }

        let response = await axios.post(CREATE_ETIQUETTE, {...etiquette}, { withCredentials: true});
        onAdd({...etiquette, id: response.data[0]});
    }

    return (
        <div>
            <h2>étiquettes</h2>
            <div>
                <ul>
                    { COLORS.map((color, index) => (
                        <li key={index} style={{ backgroundColor: color}} onClick={() => onAddEtiquette(color)}></li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default AddEtiquette;