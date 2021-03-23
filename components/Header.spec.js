import { render, screen } from '@testing-library/react';
import { MainContext } from "../pages/_app";
import Header from "./Header";

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

describe('Header component', () => {
    it('should render header properly', () => {
        render(
            <MainContext.Provider value={{ ...initialContext }}>
                <Header/>
            </MainContext.Provider>
        )
        expect(screen.getByText('trello.')).toBeInTheDocument();
    });
    it('should display inscription and connexion links when user is not logged in', () => {
        render(
            <MainContext.Provider value={{ ...initialContext }}>
                <Header/>
            </MainContext.Provider>
        )
        expect(screen.getByText('Inscription')).toBeInTheDocument();
        expect(screen.getByText('Connexion')).toBeInTheDocument();

        expect(screen.queryByText('Tableaux')).toBe(null);
        expect(screen.queryByText('Deconnexion')).toBe(null);
    });
    it('should display tableaux and deconnexion links when user is logged in', () => {
        const userLoggedContext = {...initialContext};
        userLoggedContext.ctx.user.isLogged = true;
        render(
            <MainContext.Provider value={{ ...userLoggedContext }}>
                <Header/>
            </MainContext.Provider>
        )
        expect(screen.queryByText('Inscription')).toBe(null);
        expect(screen.queryByText('Connexion')).toBe(null);

        expect(screen.getByText('Tableaux')).toBeInTheDocument();
        expect(screen.getByText('Deconnexion')).toBeInTheDocument();
    });
})