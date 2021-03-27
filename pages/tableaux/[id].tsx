import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { MouseEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import AddItem from "../../components/AddItem";
import Liste from "../../components/Liste";
import { updateState } from "../../redux/actions";
import { CREATE_LISTE_URL, GET_LISTES_URL } from "../../utils/api_endpoints";

const LISTE_WIDTH = 250;

export interface IListe{
    tableau_id: number,
    name: string,
    id?: number,
    ordre: number
}

const Tableau = ({isMoving, timer, initialMousePosition, updateListeState, selectedList}) => {
    const [listes, setListes] = useState([]);

    const router = useRouter();
    
    useEffect(() => {
        if(!router.isReady) return;
        fetchListes();
    }, [router.isReady])

    const fetchListes = async () => {
        const tableau_id: string = router.query.id as string; 

        const response = await axios.get(GET_LISTES_URL(tableau_id), { withCredentials: true});
        const data: IListe[] = response.data;
        setListes(data);
    }

    const onAddListe = async (listeName: string) => {
        const newListe = await apiAddListe(listeName);
        if(newListe){
            const newListeArr = [...listes];
            newListeArr.push({...newListe});
            setListes(newListeArr);
        }
    }

    const apiAddListe = async(listeName: string) => {
        const tableau_id = router.query.id as string; 
        const newListe: IListe = {
            name: listeName,
            tableau_id: parseInt(tableau_id),
            ordre: listes.length
        }
        try{
            const result = await axios.post(CREATE_LISTE_URL, {...newListe}, { withCredentials: true });
            if(result.status === 400) throw new Error('Erreur lors de la création de la liste.');
            newListe.id = result.data[0];
            return newListe;
        } catch(e){
            return false;
        }
    };

    const updateOrdre = (liste_id: number, value: number, currentPosition: number) => {
        const newListes = [...listes];
        for(let i = 0; i < newListes.length; i++){
            if(newListes[i].id == liste_id) newListes[i].ordre = currentPosition;
            else if(newListes[i].ordre <= currentPosition) newListes[i].ordre += value;
        }
        setListes(newListes);
    }

    const onMouseMove = (event: MouseEvent) => {
        event.preventDefault();
        if(isMoving){
            const newTime = new Date().getTime();
            const elapsedTime = newTime - timer;
            if(elapsedTime >= 200){
                const translationX = event.clientX - initialMousePosition;
                const currentPosition = Math.floor(translationX / LISTE_WIDTH);
                updateListeState({translationX});
                for(let i = 0; i < listes.length; i++){
                    if(listes[i].id == selectedList){
                        if(currentPosition > listes[i].ordre){
                            updateOrdre(listes[i].id, -1, currentPosition);
                            updateListeState({isMoving: false, translationX: 0});
                        }
                    }
                }
            }
        }   
    }

    return (
        <div id="page" className="tableau" onMouseMove={(event: MouseEvent) => onMouseMove(event)}>
            {   listes.sort((curr, next) => curr.ordre > next.ordre ? 1 : -1)
                    .map(liste => (
                        <Liste key={liste.id} liste={liste}/>
                    )) 
            }
            <AddItem onSubmit={onAddListe} buttonName="Ajouter une liste" placeholder="Nom de la liste"/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    timer: state.startedAt,
    isMoving: state.isMoving,
    initialMousePosition: state.initMousePosition,
    selectedList: state.selectedList
});
const mapDispatchToProps = (dispatch) => ({
    updateListeState: (newState: any) => dispatch(updateState(newState))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tableau);