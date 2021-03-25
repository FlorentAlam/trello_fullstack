import { FunctionComponent, useState } from "react";
import AddEtiquette from "./CarteOptions/AddEtiquette";
import Checklist from "./CarteOptions/Checklist";
import Description from "./CarteOptions/Description";
import Etiquettes, { IEtiquette } from "./CarteOptions/Etiquettes";

interface ICarteOptionsProps{
    carte: {
        id?: number,
        name: string,
        description?: string,
        etiquettes: IEtiquette[]
    },
    onDeleteEtiquette: (carte_id: number, etiquette_id: number) => void
    onAddEtiquette: (etiquette: IEtiquette) => void
}

const CarteOptions: FunctionComponent<ICarteOptionsProps> = ({ carte, onDeleteEtiquette, onAddEtiquette }) => {
    const [ addEtiquette, toggleAddEtiquette ] = useState(false);

    return (
        <div className="carte-options">
            <div className="carte-options__content">
                <div>
                    <h1>{carte.name}</h1>
                    <Description description={carte.description}/>
                    { !!carte.etiquettes.length && <Etiquettes etiquettes={carte.etiquettes} onDeleteEtiquette={(etiquette_id: number) => onDeleteEtiquette(carte.id, etiquette_id)}/>}
                    {/* { carte.checklist.length && <Checklist checklistItems={carte.checklist}/>} */}
                </div>
                <div>
                    <h2>Ajouter à la carte</h2>
                    <ul>
                        <li onClick={() => { toggleAddEtiquette(!addEtiquette)}}>Etiquettes</li>
                        { addEtiquette && <AddEtiquette carte_id={carte.id} onAdd={onAddEtiquette}/>}
                        <li>Checklist</li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default CarteOptions;