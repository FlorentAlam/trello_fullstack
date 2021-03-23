import { fireEvent, render, screen } from '@testing-library/react';
import Inscription from '../pages/inscription';
import { MainContext } from '../pages/_app';

const initialContext = {
    ctx: {
        user: {
            isLogged: false,
            id: null
        },
        flash: {
            isError: false,
            message: ''
        }
    }, 
    toggleContext: () => {}
}

describe("Inscription page", () => {
    it('Should render properly', () => {
        render(
            <MainContext.Provider value={{...initialContext}}>
                <Inscription/>
            </MainContext.Provider>
        )
        expect(screen.getAllByText("Inscription")).not.toHaveLength(1);
        expect(screen.getAllByText("Inscription")).toHaveLength(2);

        expect(screen.getByLabelText('Adresse email')).toBeInTheDocument();
        expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
        expect(screen.getByLabelText("Répétez votre mot de passe")).toBeInTheDocument();

        expect(screen.getByText("Déjà inscrit ?")).toBeInTheDocument();
    });
    it('should update email', () => {
        render(
            <MainContext.Provider value={{...initialContext}}>
                <Inscription/>
            </MainContext.Provider>
        )
        const emailInput = screen.getByLabelText('Adresse email');
        
        expect(emailInput.value).toEqual('');
        expect(emailInput.value).not.toEqual('jean@jean.com');
        fireEvent.change(emailInput, {target: {value: "jean@jean.com"}});
        expect(emailInput.value).toEqual('jean@jean.com');
    });
    it('should update password', () => {
        render(
            <MainContext.Provider value={{...initialContext}}>
                <Inscription/>
            </MainContext.Provider>
        )
        const passwordInput = screen.getByLabelText("Mot de passe");

        expect(passwordInput.value).toEqual('');
        expect(passwordInput.value).not.toEqual('mot_de_passe');
        fireEvent.change(passwordInput, {target: {value: "mot_de_passe"}});
        expect(passwordInput.value).toEqual('mot_de_passe');
    });
    it('should update password repeat', () => {
        render(
            <MainContext.Provider value={{...initialContext}}>
                <Inscription/>
            </MainContext.Provider>
        )
        const passwordRInput = screen.getByLabelText("Répétez votre mot de passe");

        expect(passwordRInput.value).toEqual('');
        expect(passwordRInput.value).not.toEqual('mot_de_passe');
        fireEvent.change(passwordRInput, {target: {value: "mot_de_passe"}});
        expect(passwordRInput.value).toEqual('mot_de_passe');
    });
});