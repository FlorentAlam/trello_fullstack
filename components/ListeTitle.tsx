import axios from "axios";
import { ChangeEvent, FunctionComponent, KeyboardEvent, MouseEvent, useState } from "react";
import { IListe } from "../pages/tableaux/[id]";
import { UPDATE_LISTE_URL } from "../utils/api_endpoints";

interface IListeTitleProps{
    liste: IListe,
    onMove: (data: {selectedListe: null | number, movement: {x: number, y: number}}) => void
}

const ListeTitle: FunctionComponent<IListeTitleProps> = ({liste, onMove}) => {
    const [isUpdatingTitle, toggleUpdating] = useState(false);
    const [listeTitle, setTitle] = useState(liste.name);

    const [ timer, setTimer ] = useState(null);
    const [ isMouseActive, toggleMouseActive ] = useState(false);
    const [ initialMousePosition, setMousePosition ] = useState({
        x: 0,
        y: 0
    });

    const onValidate = (event: KeyboardEvent) => {
        if(event.key === "Enter"){
            updateName();
            toggleUpdating(false);
        }
    }

    const updateName = async () => {
        let res = await axios.put(UPDATE_LISTE_URL, {
            id: liste.id,
            name: listeTitle
        }, { withCredentials: true});
    }

    const onMouseDown = (event: MouseEvent) => {
        event.preventDefault();
        toggleMouseActive(true);
        setTimer(new Date().getTime());
        setMousePosition({x: event.clientX, y: event.clientY});
    }

    const onMouseUp = () => {
        toggleMouseActive(false);
        const newTime = new Date().getTime();
        const elapsedTime = newTime - timer;
        if(elapsedTime < 200){
            toggleUpdating(true);
        } else {
            onMove({
                selectedListe: liste.id,
                movement: {
                    x: 0,
                    y: 0
                }
            });
        }
    }

    const onMouseMove = (event: MouseEvent) => {
        event.preventDefault();
        if(isMouseActive){
            const newTime = new Date().getTime();
            const elapsedTime = newTime - timer;
            if(elapsedTime >= 200){
                onMove({
                    selectedListe: liste.id,
                    movement: {
                        x: event.clientX - initialMousePosition.x,
                        y: event.clientY - initialMousePosition.y
                    }
                });
            }
        }   
    }

    return (
        <>  
        {   isUpdatingTitle &&
            <input value={listeTitle} 
            onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
            onKeyPress={(event: KeyboardEvent) => onValidate(event)} autoFocus/>
        }
        {
            !isUpdatingTitle &&
            <div 
                className="liste__title" 
                onMouseMove={onMouseMove} 
                onMouseUp={onMouseUp} 
                onMouseDown={onMouseDown}
            >{ listeTitle }</div>
        }
        </>
    )
};

export default ListeTitle;