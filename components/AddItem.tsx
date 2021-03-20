import { FunctionComponent, useState, KeyboardEvent, ChangeEvent } from "react";

interface IAddItemProps{
    onSubmit: (itemName: string) => void,
    buttonName: string
}

const AddItem: FunctionComponent<IAddItemProps> = ({ onSubmit, buttonName }) => {
    const [isAddingItem, toggleAddItem] = useState(false);
    const [itemName, setItemName] = useState('');

    const onKeyPressed = (event: KeyboardEvent) => {
        if(event.key === 'Enter'){
            onSubmit(itemName);
            toggleAddItem(false);
            setItemName('');
        }
    }

    return (
        <>
            {isAddingItem && <input 
                type='text' 
                value={itemName} 
                onKeyPress={(event:KeyboardEvent) => {onKeyPressed(event)}} 
                onChange={(event:ChangeEvent<HTMLInputElement>) => setItemName(event.target.value)}/>}
            { !isAddingItem && <button onClick={() => toggleAddItem(!isAddingItem)}>{ buttonName }</button> }
            
        </>
    )
};

export default AddItem;