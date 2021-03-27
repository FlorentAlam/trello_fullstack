import { useState } from "react";
import CarteOptions from "./CarteOptions";

const Carte = ({carte, onDeleteEtiquette, onUpdateChecklist, onAddItem}) => {
    const [ isOptionActive, toggleOptions ] = useState(false);
    return (
        <div className="carte" onClick={() => { toggleOptions(true) }}>
            { !!carte.etiquettes.length && (
                <div className="carte__etiquettes">
                    { carte.etiquettes.map((etiquette, index) => (
                        <div className="carte__etiquette" key={index} style={{ backgroundColor: etiquette.color }}></div>
                    ))}
                </div>
            )}
            { carte.name }
            { !!carte.checklists.length && (
                <div>{carte.checklists.reduce((acc, curr) => { 
                    if(curr.isChecked) {
                        return acc + 1
                    } else return acc;
                }, 0) || 0}/{carte.checklists.length}</div>
            )}
            { isOptionActive && <CarteOptions onUpdateChecklist={onUpdateChecklist} carte={carte} onAddItem={onAddItem} onDeleteEtiquette={onDeleteEtiquette}/> }
        </div>
    )
};

export default Carte;