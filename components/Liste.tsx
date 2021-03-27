import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { IListe } from "../pages/tableaux/[id]";
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
    liste: IListe,
    selectedListe: number,
    translation: number
}

const Liste: FunctionComponent<IListeProps> = ({ liste, selectedListe, translation }) => {
    const [cartes, setCartes] = useState([]);

    useEffect(() => {
        fetchCartes();
    }, [])

    const fetchCartes = async () => {
        const response = await axios.get(GET_CARTES_URL(liste.id), { withCredentials: true});
        const data: ICarte[] = response.data;
        setCartes(data);
    }

    const onAddCarte = async (carteName: string) => {
        const result = await apiAddCarte(carteName);
        if(result){
            const newListe = [...cartes];
            newListe.push({id: result[0], name: carteName, checklists: [], etiquettes: []});
            setCartes(newListe);
        }
    }

    const apiAddCarte = async(carteName: string) => {
        try{
            const result = await axios.post(CREATE_CARTE_URL, {
                name: carteName,
                liste_id: liste.id
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

    const onAddItem = (item: IEtiquette | IChecklist, name: string) => {
        const cartesCopy = [...cartes];
        for(let i = 0; i < cartes.length; i++){
            if(cartes[i].id === item.carte_id){
                cartesCopy[i][name].push(item);
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
        <div className="liste"  style={{zIndex: (liste.id === selectedListe ? 4 : 1) , transform: (liste.id === selectedListe ? `translateX(${translation}px)` : '')}}>
            <ListeTitle liste={liste}/>
            {cartes.map((carte) => (
                <Carte key={carte.id} carte={carte} onUpdateChecklist={onUpdateChecklist} onDeleteEtiquette={onDeleteEtiquette} onAddItem={onAddItem}/>
            ))}
            <AddItem onSubmit={onAddCarte} buttonName="Ajouter une carte" placeholder="Nom de la carte"/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    selectedListe: state.selectedList,
    translation: state.translationX
})

export default connect(mapStateToProps)(Liste);