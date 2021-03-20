import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import AddItem from "../../components/AddItem";
import Liste from "../../components/Liste";
import { CREATE_LISTE_URL, GET_LISTES_URL } from "../../utils/api_endpoints";

interface IListe{
    tableau_id: number,
    name: string,
    id?: number
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

        const response = await axios.get(GET_LISTES_URL(tableau_id));
        const data: IListe[] = response.data;
        setListes(data);
    }

    const onAddListe = async (listeName: string) => {
        const result = await apiAddListe(listeName);
        if(result){
            const newListe = [...listes];
            newListe.push({id: result[0], name: listeName});
            setListes(newListe);
        }
    }

    const apiAddListe = async(listeName: string) => {
        const tableau_id = router.query.id; 
        try{
            const result = await axios.post(CREATE_LISTE_URL, {
                name: listeName,
                tableau_id
            });
            if(result.status === 400) throw new Error('Erreur lors de la création de la liste.');
            return result.data;
        } catch(e){
            return false;
        }
    };

    return (
        <div className="tableau">
            { listes.map((liste, index) => (
                <Liste key={liste.id} liste_id={liste.id} listeName={liste.name} />
            ))}
            <AddItem onSubmit={onAddListe} buttonName="Ajouter une liste"/>
        </div>
    )
};

export default Tableau;