import axios from "axios";
import { ChangeEvent, FunctionComponent, KeyboardEvent, useState } from "react";
import { UPDATE_LISTE_URL } from "../utils/api_endpoints";

interface IListeTitleProps{
    title: string,
    liste_id: number
}

const ListeTitle: FunctionComponent<IListeTitleProps> = ({title, liste_id}) => {
    const [isUpdatingTitle, toggleUpdating] = useState(false);
    const [listeTitle, setTitle] = useState(title);

    const onValidate = (event: KeyboardEvent) => {
        if(event.key === "Enter"){
            updateName();
            toggleUpdating(false);
        }
    }

    const updateName = async () => {
        let res = await axios.put(UPDATE_LISTE_URL, {
            id: liste_id,
            name: listeTitle
        });
    }

    return (
        <>  
        {   isUpdatingTitle &&
            <input 
            value={listeTitle} 
            onChange={
                (event: ChangeEvent<HTMLInputElement>) => { 
                    setTitle(event.target.value);
                }
            }
            onKeyPress={
                (event: KeyboardEvent) => {
                    onValidate(event);
                }
            }
            autoFocus/>
        }
        {
            !isUpdatingTitle &&
            <span onClick={() => toggleUpdating(true)}>{ listeTitle }</span>
        }
        </>
    )
};

export default ListeTitle;