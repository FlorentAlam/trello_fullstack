import { fireEvent, render, screen } from '@testing-library/react';
import Connexion from '../pages/connexion';
import { MainContext } from '../pages/_app';

const mockToggle = jest.fn(() => {});

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
    toggleContext: (data) => { mockToggle(data) }
}

describe("Connexion page", () => {
    it('Should render properly', () => {
        render(
            <MainContext.Provider value={{...initialContext}}>
                <Connexion/>
            </MainContext.Provider>
        )
        expect(screen.getAllByText("Connexion")).not.toHaveLength(1);
        expect(screen.getAllByText("Connexion")).toHaveLength(2);

        expect(screen.getByLabelText('Adresse email')).toBeInTheDocument();
        expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();

        expect(screen.getByText("Pas encore inscrit ?")).toBeInTheDocument();
    });
    it('should update email', () => {
        render(
            <MainContext.Provider value={{...initialContext}}>
                <Connexion/>
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
                <Connexion/>
            </MainContext.Provider>
        )
        const passwordInput = screen.getByLabelText("Mot de passe");

        expect(passwordInput.value).toEqual('');
        expect(passwordInput.value).not.toEqual('mot_de_passe');
        fireEvent.change(passwordInput, {target: {value: "mot_de_passe"}});
        expect(passwordInput.value).toEqual('mot_de_passe');
    });
    it('should toggle flash on password not long enough', () => {
        render(
            <MainContext.Provider value={{...initialContext}}>
                <Connexion/>
            </MainContext.Provider>
        )
        const passwordInput = screen.getByLabelText("Mot de passe");
        const submitButton = screen.getByRole('submit');

        expect(passwordInput.value).toEqual('');
        fireEvent.change(passwordInput, {target: {value: "t"}});
        expect(passwordInput.value).toEqual('t');
        fireEvent.click(submitButton);

        expect(mockToggle).toHaveBeenCalledWith({
            flash: {
                isError: true,
                message: "Votre mot de passe doit contenir au moins 6 caractères."
            },
            user: {
                isLogged: false,
                id: null
            }
        });
        expect(mockToggle).not.toHaveBeenCalledWith({
            flash: {
                isError: true,
                message: "Random string"
            },
            user: {
                isLogged: false,
                id: null
            }
        });

    });
    it('should toggle flash on email not given', () => {
        render(
            <MainContext.Provider value={{...initialContext}}>
                <Connexion/>
            </MainContext.Provider>
        )
        const emailInput = screen.getByLabelText("Adresse email");
        const submitButton = screen.getByRole('submit');

        expect(emailInput.value).toEqual('');
        fireEvent.click(submitButton);

        expect(mockToggle).toHaveBeenCalledWith({
            flash: {
                isError: true,
                message: "Aucune chaine de caractère spécifiée."
            },
            user: {
                isLogged: false,
                id: null
            }
        });
    });
    it('should toggle flash on email too short', () => {
        render(
            <MainContext.Provider value={{...initialContext}}>
                <Connexion/>
            </MainContext.Provider>
        )
        const emailInput = screen.getByLabelText("Adresse email");

        // Password needed to not throw password error.
        const passwordInput = screen.getByLabelText("Mot de passe");
        fireEvent.change(passwordInput, {target: {value: "mot_de_passe"}});

        const submitButton = screen.getByRole('submit');

        expect(emailInput.value).toEqual('');
        fireEvent.change(emailInput, {target: {value: "jea"}});
        expect(emailInput.value).toEqual('jea');
        fireEvent.click(submitButton);

        expect(mockToggle).toHaveBeenCalledWith({
            flash: {
                isError: true,
                message: "Veuillez fournir une adresse email correcte."
            },
            user: {
                isLogged: false,
                id: null
            }
        });

    });
});