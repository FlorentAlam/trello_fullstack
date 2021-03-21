import { ChangeEvent, useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Fieldset from "../components/Fieldset";
import Form from "../components/Form";
import Link from 'next/link';
import { checkLength, checkPasswordEquality } from "../utils/error-checker";
import { USER_INSCRIPTION } from "../utils/api_endpoints";
import axios from "axios";
import { useRouter } from "next/dist/client/router";

const Inscription = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [error, setError] = useState({
        isActive: false,
        message: ''
    });

    const router = useRouter();

    useEffect(() => {
        document.title = "Connexion - trello."
    }, [])

    const onSubmit = async () => {
        try{
            if(!checkLength(password, 6)) throw new Error("Votre mot de passe doit contenir au moins 6 caractères.");
            if(!checkLength(email, 1)) throw new Error("Veuillez fournir une adresse email correcte.");
            if(!checkPasswordEquality(password, passwordRepeat)) throw new Error("Vos mots de passe ne correspondent pas.");
            let res = await axios.post(USER_INSCRIPTION, {
                email, password
            });
            setError({
                isActive: false,
                message: ""
            });
            router.push('/connexion');
        } catch (e){
            if(e.response){
                if(e.response.data === "USER_ALREADY_REGISTERED_ERROR"){
                    setError({
                        isActive: true,
                        message: "Un compte est déjà associé à cette adresse email."
                    });
                } else if(e.response.data === "INTERNAL_ERROR"){
                    setError({
                        isActive: true,
                        message: "Une erreur interne est survenue, veuillez réessayer ultérieurement."
                    });
                }
            } else {
                setError({
                    isActive: true,
                    message: e.message
                });
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
        { error.isActive && <ErrorMessage message={ error.message }/> }
    </div>
)};

export default Inscription;