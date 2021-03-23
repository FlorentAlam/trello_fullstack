import { ChangeEvent, useContext, useEffect, useState } from "react";
import Fieldset from "../components/Fieldset";
import Form from "../components/Form";
import Link from 'next/link';
import { checkLength } from "../utils/error-checker";
import axios from "axios";
import { USER_CONNEXION } from "../utils/api_endpoints";
import { useRouter } from "next/dist/client/router";
import { MainContext } from "./_app";

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { ctx, toggleContext } = useContext(MainContext);

    const router = useRouter();

    useEffect(() => {
        document.title = "Connexion - trello."
    }, [])

    const onSubmit = async () => {
        try{
            if(!checkLength(password, 6)) throw new Error("Votre mot de passe doit contenir au moins 6 caractères.");
            if(!checkLength(email, 4)) throw new Error("Veuillez fournir une adresse email correcte.");
            let res = await axios.post(USER_CONNEXION, {
                email, password
            }, {withCredentials: true});
            toggleContext({...ctx, user: { isLogged: true, id: res.data.userId }, flash: { isError: false, message: 'Vous êtes connecté !'}});
            router.push('/tableaux');
        } catch (e){
            if(e.response){
                if(e.response.data === "PASSWORD_ERROR" || e.reponse.data === "USER_NOT_FOUND_ERROR"){
                    toggleContext({...ctx, flash: { isError: true, message: "L'adresse email ou le mot de passe ne correspondent pas."}});
                } else if(e.response.data === "INTERNAL_ERROR"){
                    toggleContext({...ctx, flash: { isError: true, message: "Une erreur interne est survenue, veuillez réessayer ultérieurement."}});
                }
            } else {
                toggleContext({...ctx, flash: { isError: true, message: e.message}});
            }
        }
    }    

    return (
    <div id="page" className="registration-page">
        <h1>Connexion</h1>
        <Form buttonName="Connexion" submitAction={ onSubmit }>
            <Fieldset 
                name="email" 
                type="email" 
                value={email} 
                onChange={(event:ChangeEvent<HTMLInputElement>) => { 
                    setEmail(event.target.value)
                } }
                label="Adresse email"
                autocomplete="email"
            />
            <Fieldset 
                name="password" 
                type="password" 
                value={password} 
                onChange={(event:ChangeEvent<HTMLInputElement>) => { 
                    setPassword(event.target.value)
                } }
                label="Mot de passe"
                autocomplete="current-password"
            />
        </Form>
        <Link href="/inscription">Pas encore inscrit ?</Link>
    </div>
)};

export default Connexion;