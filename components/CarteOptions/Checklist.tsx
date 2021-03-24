import { FunctionComponent } from "react";

interface IChecklistProps{
    checklistItems: {
        isChecked: boolean,
        name: string
    }[]
}

const Checklist: FunctionComponent<IChecklistProps> = ({ checklistItems }) => {
    return (
        <div>
            <h2>Checklist</h2>
            <div className="bar"> </div>
            <div>
                { checklistItems.map((item, index) => (
                    <div key={index}>
                        <input type="checkbox" checked={item.isChecked} name={item.name} id={item.name}/>
                        <label htmlFor={item.name}>{item.name}</label>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Checklist;