import { ChangeEvent, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Fieldset from "../components/Fieldset";
import Form from "../components/Form";
import Link from 'next/link';
import { checkLength } from "../utils/error-checker";
import axios from "axios";

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState({
        isActive: false,
        message: ''
    });

    const onSubmit = async () => {
        try{
            if(!checkLength(password, 6)) throw new Error("Votre mot de passe doit contenir au moins 6 caractères.");
            if(!checkLength(email, 1)) throw new Error("Veuillez fournir une adresse email correcte.");
            setError({
                isActive: false,
                message: ""
            });
            let res = await axios.post('http://localhost:3300/api/users/login', {
                email, password
            });
            console.log(res);

        } catch (e){
            setError({
                isActive: true,
                message: e.message
            });
        }
    }    

    return (
    <>
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
        { error.isActive && <ErrorMessage message={ error.message }/> }
    </>
)};

export default Connexion;