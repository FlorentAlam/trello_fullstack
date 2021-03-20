import axios from "axios";
import Link from "next/link";
import { FunctionComponent, useEffect, useState } from "react";
import AddItem from "../../components/AddItem";
import { CREATE_TABLEAU_URL, GET_TABLEAUX_URL } from "../../utils/api_endpoints";

interface ITableau{
    id: number,
    name: string
}

const Dashboard: FunctionComponent = () => {
    const [tableaux, setTableaux] = useState<ITableau[]>([]);

    useEffect(() => {
        fetchTableaux();
    }, []);

    const fetchTableaux = async () => {
        const response = await axios.get(GET_TABLEAUX_URL);
        const data: ITableau[] = response.data;
        
        setTableaux(data);
    };

    const onAddTableau = async (tableauName: string) => {
        const result = await apiAddTableau(tableauName);
        if(result){
            const newTab = [...tableaux];
            newTab.push({id: result[0], name: tableauName});
            setTableaux(newTab);
        }
    }

    const apiAddTableau = async(tableauName: string) => {
        try{
            const result = await axios.post(CREATE_TABLEAU_URL, {
                name: tableauName
            });
            if(result.status === 400) throw new Error('Erreur lors de la création du tableau.');
            return result.data;
        } catch(e){
            return false;
        }
    };

    return (
        <div className="dashboard">
            { tableaux.map((tableau) => (
                <button className="dashboard__button" key={tableau.id}><Link href={`/tableaux/${tableau.id}`}>{tableau.name}</Link></button>
            ))}
            <AddItem onSubmit={onAddTableau} buttonName="Ajouter un tableau"/>
        </div>
    )
};

export default Dashboard;