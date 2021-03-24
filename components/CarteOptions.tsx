import { FunctionComponent, useState } from "react";
import AddEtiquette from "./CarteOptions/AddEtiquette";
import Checklist from "./CarteOptions/Checklist";
import Description from "./CarteOptions/Description";
import Etiquettes from "./CarteOptions/Etiquettes";

interface IChecklistItem{
    isChecked: boolean,
    name: string
}

interface ICarteOptionsProps{
    etiquettes: string[],
    checklist: IChecklistItem[],
    description: string,
    couvertureImage: string,
    name: string
}

const CarteOptions: FunctionComponent<ICarteOptionsProps> = ({etiquettes, checklist, description, couvertureImage, name}) => {
    const [ addEtiquette, toggleAddEtiquette ] = useState(false);
    
    const onAddEtiquette = (color: string) => {

    }

    return (
        <div>
            <div>
                <h1>{name}</h1>
                <Description description={description}/>
                { etiquettes.length && <Etiquettes etiquettes={etiquettes}/>}
                { checklist.length && <Checklist checklistItems={checklist}/>}
            </div>
            <div>
                <h2>Ajouter à la carte</h2>
                <ul>
                    <li onClick={() => { toggleAddEtiquette(!addEtiquette)}}>Etiquettes</li>
                    { addEtiquette && <AddEtiquette onAdd={onAddEtiquette}/>}
                    <li>Checklist</li>
                </ul>
            </div>
        </div>
    )
};

export default CarteOptions;