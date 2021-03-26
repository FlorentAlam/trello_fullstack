import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { CREATE_CARTE_URL, GET_CARTES_URL } from "../utils/api_endpoints";
import AddItem from "./AddItem";
import Carte from "./Carte";
import { IChecklist } from "./CarteOptions/Checklist";
import { IEtiquette } from "./CarteOptions/Etiquettes";
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
        console.log(data);
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

    const onDeleteEtiquette = (carte_id: number, etiquette_id: number) => {
        let cartesCopy = [];
        for(let i = 0; i < cartes.length; i++){
            if(cartes[i].id === carte_id){
                let newCarte = {...cartes[i]};
                newCarte.etiquettes = newCarte.etiquettes.filter(etiquette => {
                    return etiquette.id !== etiquette_id;
                });
                cartesCopy.push(newCarte);
            } else {
                cartesCopy.push(cartes[i]);
            }
            setCartes(cartesCopy);
        }
    }

    const onAddEtiquette = ({carte_id, color, id}: IEtiquette) => {
        const cartesCopy = [...cartes];
        for(let i = 0; i < cartes.length; i++){
            if(cartes[i].id === carte_id){
                cartesCopy[i].etiquettes.push({carte_id, color, name: '', id});
            }
        }
        setCartes(cartesCopy);
    }

    const onAddChecklist = (checklist: IChecklist) => {
        const cartesCopy = [...cartes];
        for(let i = 0; i < cartes.length; i++){
            if(cartes[i].id === checklist.carte_id){
                cartesCopy[i].checklists.push(checklist);
            }
        }
        setCartes(cartesCopy);
    }

    const onUpdateChecklist = (checklist: IChecklist) => {
        const cartesCopy = [...cartes];
        for(let i = 0; i < cartes.length; i++){
            if(cartes[i].id === checklist.carte_id){
                for(let j = 0; j < cartes[i].checklists.length; j++){
                    if(cartes[i].checklists[j].id === checklist.id){
                        cartes[i].checklists[j] = checklist;
                        break;
                    }
                }
            }
        }
        setCartes(cartesCopy);
    }

    return (
        <div className="liste">
            <ListeTitle title={ listeName } liste_id={ liste_id }/>
            {cartes.map((carte) => (
                <Carte key={carte.id} carte={carte} onUpdateChecklist={onUpdateChecklist} onDeleteEtiquette={onDeleteEtiquette} onAddEtiquette={onAddEtiquette} onAddChecklist={onAddChecklist}/>
            ))}
            <AddItem onSubmit={onAddCarte} buttonName="Ajouter une carte" placeholder="Nom de la carte"/>
        </div>
    )
};

export default Liste;