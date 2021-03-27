import axios from "axios";
import { FunctionComponent, useContext } from "react";
import { MainContext } from "../../pages/_app";
import { UPDATE_CHECKLIST } from "../../utils/api_endpoints";

export interface IChecklist{
    id?: number,
    name: string,
    isChecked: boolean,
    carte_id: number
}

interface IChecklistProps{
    checklistItems: IChecklist[],
    onUpdate: (checklist: IChecklist) => void
}

const Checklist: FunctionComponent<IChecklistProps> = ({ checklistItems, onUpdate }) => {
    const { ctx, toggleContext } = useContext(MainContext);

    const onToggleChecklist = async (item: IChecklist) => {
        const checklist = {...item, isChecked: !item.isChecked}
        try{
            let response = await axios.put(UPDATE_CHECKLIST(item.id), {
                isChecked: !item.isChecked
            }, { withCredentials: true});
            onUpdate(checklist);
        } catch(e){
            toggleContext({...ctx, flash: { isError: true, message: "Une erreur est survenue, veuillez réessayer ultérieurement."}});
        }
    }

    return (
        <div>
            <h2>Checklist</h2>
            <div className="bar"> </div>
            <div>
                { checklistItems.map((item, index) => (
                    <div key={index}>
                        <input type="checkbox" checked={item.isChecked} name={item.name} id={item.name} onChange={() => onToggleChecklist(item)}/>
                        <label htmlFor={item.name}>{item.name}</label>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Checklist;