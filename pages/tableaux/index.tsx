import axios from "axios";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import AddItem from "../../components/AddItem";
import { CREATE_TABLEAU_URL, GET_TABLEAUX_URL } from "../../utils/api_endpoints";
import { MainContext } from "../_app";

interface ITableau{
    id: number,
    name: string
}

const Dashboard: FunctionComponent = () => {
    const [tableaux, setTableaux] = useState<ITableau[]>([]);

    const { ctx, toggleContext } = useContext(MainContext);
    const router = useRouter();

    useEffect(() => {
        document.title = "Tableaux - trello.";
        if(ctx.user.isLogged){
            fetchTableaux();
        } else {
            router.push('/connexion');
        }
    }, []);

    const fetchTableaux = async () => {
        try{
            const response = await axios.get(GET_TABLEAUX_URL, {withCredentials: true});
            const data: ITableau[] = response.data;
            setTableaux(data);
        } catch(e){
            toggleContext({...ctx, flash: { isError: true, message: "Une erreur s'est produite lors de la récupération des tableaux."}});
        }
    };

    const onAddTableau = async (tableauName: string) => {
        try{
            const result = await apiAddTableau(tableauName);
            if(result){
                toggleContext({...ctx, flash: { isError: false, message: "Tableau créé avec succés !"}});
                const newTab = [...tableaux];
                newTab.push({id: result[0], name: tableauName});
                setTableaux(newTab);
            }
        } catch(e){
            toggleContext({...ctx, flash: { isError: true, message: "Une erreur s'est produite lors de la création du tableau."}});
        }
        
    }

    const apiAddTableau = async(tableauName: string) => {
        try{
            const result = await axios.post(CREATE_TABLEAU_URL, {
                name: tableauName
            }, { withCredentials: true});
            if(result.status === 400) throw new Error('Erreur lors de la création du tableau.');
            return result.data;
        } catch(e){
            return false;
        }
    };

    return (
        <div id="page" className="dashboard">
            { tableaux.map((tableau) => (
                <button className="dashboard__button" key={tableau.id}><Link href={`/tableaux/${tableau.id}`}>{tableau.name}</Link></button>
            ))}
            <AddItem onSubmit={onAddTableau} buttonName="Ajouter un tableau" placeholder="Nom du tableau"/>
        </div>
    )
};

export default Dashboard;