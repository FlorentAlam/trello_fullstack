import { ChangeEvent, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Fieldset from "../components/Fieldset";
import Form from "../components/Form";
import Link from 'next/link';
import { checkLength, checkPasswordEquality } from "../utils/error-checker";

const Inscription = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [error, setError] = useState({
        isActive: false,
        message: ''
    });

    const onSubmit = () => {
        try{
            if(!checkLength(password, 6)) throw new Error("Votre mot de passe doit contenir au moins 6 caractères.");
            if(!checkLength(email, 1)) throw new Error("Veuillez fournir une adresse email correcte.");
            if(!checkPasswordEquality(password, passwordRepeat)) throw new Error("Vos mots de passe ne correspondent pas.");
            setError({
                isActive: false,
                message: ""
            });
        } catch (e){
            setError({
                isActive: true,
                message: e.message
            });
        }
    }    

    return (
    <>
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
    </>
)};

export default Inscription;