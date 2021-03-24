import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { CREATE_CARTE_URL, GET_CARTES_URL } from "../utils/api_endpoints";
import AddItem from "./AddItem";
import Carte from "./Carte";
import ListeTitle from "./ListeTitle";

interface ICarte{
    id: number,
    name: string
}

interface IListeProps{
    listeName: string,
    liste_id: number
}

const Liste: FunctionComponent<IListeProps> = ({ listeName, liste_id }) => {

    const [cartes, setCartes] = useState([]);

    useEffect(() => {
        fetchCartes();
    }, [])

    const fetchCartes = async () => {
        const response = await axios.get(GET_CARTES_URL(liste_id), { withCredentials: true});
        const data: ICarte[] = response.data;
        setCartes(data);
    }

    const onAddCarte = async (carteName: string) => {
        const result = await apiAddCarte(carteName);
        if(result){
            const newListe = [...cartes];
            newListe.push({id: result[0], name: carteName});
            setCartes(newListe);
        }
    }

    const apiAddCarte = async(carteName: string) => {
        try{
            const result = await axios.post(CREATE_CARTE_URL, {
                name: carteName,
                liste_id
            }, { withCredentials: true });
            if(result.status === 400) throw new Error('Erreur lors de la création de la carte.');
            return result.data;
        } catch(e){
            return false;
        }
    };

    return (
        <div className="liste">
            <ListeTitle title={ listeName } liste_id={ liste_id }/>
            {cartes.map((carte) => (
                <Carte key={carte.id} name={carte.name}/>
            ))}
            <AddItem onSubmit={onAddCarte} buttonName="Ajouter une carte" placeholder="Nom de la carte"/>
        </div>
    )
};

export default Liste;