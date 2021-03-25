import { useState } from "react";
import CarteOptions from "./CarteOptions";

const Carte = ({carte, onDeleteEtiquette, onAddEtiquette}) => {
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
            { isOptionActive && <CarteOptions carte={carte} onDeleteEtiquette={onDeleteEtiquette} onAddEtiquette={onAddEtiquette}/> }
        </div>
    )
};

export default Carte;