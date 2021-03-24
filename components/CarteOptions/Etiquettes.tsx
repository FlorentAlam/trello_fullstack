import { FunctionComponent } from "react";

interface IEtiquettesProps{
    etiquettes: string[]
}

const Etiquettes: FunctionComponent<IEtiquettesProps> = ({ etiquettes }) => {
    return (
        <div>
            <h2>étiquettes</h2>
            <div> 
                { etiquettes.map((etiquette, index) => (
                    <div key={index} style={{backgroundColor: etiquette}}></div>
                ))}
            </div>
        </div>
    )
};

export default Etiquettes;