import axios from "axios";
import { FunctionComponent } from "react";
import { FaTimes } from "react-icons/fa";
import { DELETE_ETIQUETTE } from "../../utils/api_endpoints";

export interface IEtiquette{
    id?: number,
    color: string,
    carte_id: number,
    name?: string
}

interface IEtiquettesProps{
    etiquettes: IEtiquette[],
    onDeleteEtiquette: (etiquette_id: number) => void
}

const Etiquettes: FunctionComponent<IEtiquettesProps> = ({ etiquettes, onDeleteEtiquette }) => {
    const onDelete = async (etiquette_id: number) => {
        let response = await axios.delete(DELETE_ETIQUETTE(etiquette_id), {withCredentials: true});
        onDeleteEtiquette(etiquette_id);
    }

    return (
        <div className="etiquettes">
            <h2>étiquettes</h2>
            <div className="etiquettes__liste"> 
                { etiquettes.map((etiquette, index) => (
                    <div className="etiquettes__etiquette" key={index} style={{backgroundColor: etiquette.color}}>
                        <FaTimes className="etiquettes__close-button" onClick={() => onDelete(etiquette.id)}/>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Etiquettes;