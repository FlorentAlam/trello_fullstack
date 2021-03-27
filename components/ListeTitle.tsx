import axios from "axios";
import { ChangeEvent, FunctionComponent, KeyboardEvent, MouseEvent, useState } from "react";
import { connect } from "react-redux";
import { IListe } from "../pages/tableaux/[id]";
import { updateState } from "../redux/actions";
import { UPDATE_LISTE_URL } from "../utils/api_endpoints";

interface IListeTitleProps{
    liste: IListe,
    updateListeState: (newState: any) => void,
    timer: number
}

const ListeTitle: FunctionComponent<IListeTitleProps> = ({liste, updateListeState, timer}) => {
    const [isUpdatingTitle, toggleUpdating] = useState(false);
    const [listeTitle, setTitle] = useState(liste.name);

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
        updateListeState({selectedList: liste.id, isMoving: true, startedAt: new Date().getTime(), initMousePosition: event.clientX});
    }
    const onMouseUp = () => {
        updateListeState({isMoving: false});
        const newTime = new Date().getTime();
        const elapsedTime = newTime - timer;
        if(elapsedTime < 200){
            toggleUpdating(true);
        } else {
            updateListeState({selectedList: liste.id, translationX: 0});
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
                onMouseUp={onMouseUp} 
                onMouseDown={onMouseDown}
            >{ listeTitle }</div>
        }
        </>
    )
};

const mapStateToProps = (state) => ({ 
    timer: state.startedAt
});

const mapDispatchToProps = (dispatch) => ({
    updateListeState: (newState: any) => dispatch(updateState(newState))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListeTitle);