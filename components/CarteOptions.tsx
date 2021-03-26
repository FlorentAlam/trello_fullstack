import { FunctionComponent, useState } from "react";
import { FaRegBookmark, FaRegCheckSquare } from "react-icons/fa";
import AddChecklist from "./CarteOptions/AddChecklist";
import AddEtiquette from "./CarteOptions/AddEtiquette";
import Checklist, { IChecklist } from "./CarteOptions/Checklist";
import Description from "./CarteOptions/Description";
import Etiquettes, { IEtiquette } from "./CarteOptions/Etiquettes";

interface ICarteOptionsProps{
    carte: {
        id?: number,
        name: string,
        description?: string,
        etiquettes: IEtiquette[],
        checklists: IChecklist[]
    },
    onDeleteEtiquette: (carte_id: number, etiquette_id: number) => void
    onAddEtiquette: (etiquette: IEtiquette) => void,
    onAddChecklist: (checklist: IChecklist) => void,
    onUpdateChecklist: (checklist: IChecklist) => void
}

const CarteOptions: FunctionComponent<ICarteOptionsProps> = ({ carte, onDeleteEtiquette, onAddEtiquette, onAddChecklist, onUpdateChecklist }) => {
    const [ addEtiquette, toggleAddEtiquette ] = useState(false);
    const [ addChecklist, toggleAddChecklist ] = useState(false);

    return (
        <div className="carte-options">
            <div className="carte-options__content">
                <div className="carte-options__left">
                    <h1>{carte.name}</h1>
                    <Description description={carte.description}/>
                    { !!carte.etiquettes.length && <Etiquettes etiquettes={carte.etiquettes} onDeleteEtiquette={(etiquette_id: number) => onDeleteEtiquette(carte.id, etiquette_id)}/>}
                    { !!carte.checklists.length && <Checklist checklistItems={carte.checklists} onUpdate={onUpdateChecklist}/>}
                </div>
                <div className="carte-options__right">
                    <h2 className="carte-options__right__carte-name">Ajouter à la carte</h2>
                    <ul>
                        <li onClick={() => { toggleAddEtiquette(!addEtiquette)}} className="carte-options__right__item"><FaRegBookmark/>Etiquettes</li>
                        { addEtiquette && <AddEtiquette carte_id={carte.id} onAdd={onAddEtiquette} onClose={() => toggleAddEtiquette(false)}/>}
                        <li onClick={() => { toggleAddChecklist(!addChecklist)}} className="carte-options__right__item"><FaRegCheckSquare/>Checklist</li>
                        { addChecklist && <AddChecklist carte_id={carte.id} onAdd={onAddChecklist} onClose={() => toggleAddChecklist(false)}/>}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default CarteOptions;