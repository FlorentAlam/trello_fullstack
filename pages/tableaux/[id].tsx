import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import AddItem from "../../components/AddItem";
import Liste from "../../components/Liste";
import { CREATE_LISTE_URL, GET_LISTES_URL } from "../../utils/api_endpoints";

export interface IListe{
    tableau_id: number,
    name: string,
    id?: number,
    ordre: number
}

const Tableau = () => {
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

    return (
        <div id="page" className="tableau">
            { listes.map(liste => (
                <Liste key={liste.id} liste={liste}/>
            ))}
            <AddItem onSubmit={onAddListe} buttonName="Ajouter une liste" placeholder="Nom de la liste"/>
        </div>
    )
};

export default Tableau;