import { useState } from "react";
import CarteOptions from "./CarteOptions";

const Carte = ({carte, onDeleteEtiquette, onAddEtiquette, onAddChecklist, onUpdateChecklist}) => {
    const [ isOptionActive, toggleOptions ] = useState(false);
    return (
        <div className="carte" onClick={() => { toggleOptions(true) }}>
            { !!carte.etiquettes.length && (
                <div className="carte__etiquettes">
                    { carte.etiquettes.map((etiquette, index) => (
                        <div className="carte__etiquette" style={{ backgroundColor: etiquette.color }}></div>
                    ))}
                </div>
            )}
            { carte.name }
            { !!carte.checklists.length && (
                <div>{carte.checklists.reduce((acc, curr) => { if(curr.isChecked) return acc + 1}, 0) || 0}/{carte.checklists.length}</div>
            )}
            { isOptionActive && <CarteOptions onUpdateChecklist={onUpdateChecklist} carte={carte} onDeleteEtiquette={onDeleteEtiquette} onAddEtiquette={onAddEtiquette} onAddChecklist={onAddChecklist}/> }
        </div>
    )
};

export default Carte;