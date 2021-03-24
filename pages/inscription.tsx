import { ChangeEvent, useContext, useEffect, useState } from "react";
import Fieldset from "../components/Fieldset";
import Form from "../components/Form";
import Link from 'next/link';
import { checkLength, checkPasswordEquality } from "../utils/error-checker";
import { USER_INSCRIPTION } from "../utils/api_endpoints";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { MainContext } from "./_app";

const Inscription = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const { ctx, toggleContext } = useContext(MainContext);

    const router = useRouter();

    useEffect(() => {
        document.title = "Connexion - trello."
    }, [])

    const onSubmit = async () => {
        try{
            if(!checkLength(password, 6)) throw new Error("Votre mot de passe doit contenir au moins 6 caractères.");
            if(!checkLength(email, 3)) throw new Error("Veuillez fournir une adresse email correcte.");
            if(!checkPasswordEquality(password, passwordRepeat)) throw new Error("Vos mots de passe ne correspondent pas.");
            let res = await axios.post(USER_INSCRIPTION, {
                email, password
            });
            toggleContext({...ctx, flash: { isError: false, message: 'Inscription réussie !'}});
            router.push('/connexion');
        } catch (e){
            if(e.response){
                if(e.response.data === "USER_ALREADY_REGISTERED_ERROR"){
                    toggleContext({...ctx, flash: { isError: true, message: 'Un compte est déjà associé à cette adresse email.'}});
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
        <h1>Inscription</h1>
        <Form buttonName="Inscription" submitAction={ onSubmit }>
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
                autocomplete="new-password"
            />
            <Fieldset 
                name="passwordR" 
                type="password" 
                value={passwordRepeat} 
                onChange={(event:ChangeEvent<HTMLInputElement>) => { 
                    setPasswordRepeat(event.target.value)
                } }
                label="Répétez votre mot de passe"
            />
        </Form>
        <Link href="/connexion">Déjà inscrit ?</Link>
    </div>
)};

export default Inscription;