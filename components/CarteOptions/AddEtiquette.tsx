import { FunctionComponent } from "react";

const COLORS = ["#ffe018", "#990000", "#FF7F50", "#9ACD32", "#4682B4", "#BA55D3"];

interface IAddEtiquetteProps{
    onAdd: (color: string) => void
}

const AddEtiquette: FunctionComponent<IAddEtiquetteProps> = ({ onAdd }) => {
    return (
        <div>
            <h2>étiquettes</h2>
            <div>
                <ul>
                    { COLORS.map((color, index) => (
                        <li key={index} style={{ backgroundColor: color}} onClick={() => onAdd(color)}></li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default AddEtiquette;