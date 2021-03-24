import { render, screen } from '@testing-library/react';
import { MainContext } from '../../pages/_app';
import Flash from '../Flash';

const initialContext = {
    ctx: {
        flash: {
            isError: false,
            message: ''
        }
    }
}

describe('Flash component', () => {
    it("should render properly", () => {
        render(
            <MainContext.Provider value={{...initialContext}}>
                <Flash/>
            </MainContext.Provider>
        );

        const message = screen.queryByText('ceci est une erreur');
        expect(message).not.toBeInTheDocument(); 
    });
    it("should display message when value is provided", () => {
        initialContext.ctx.flash.message = "ceci est une erreur";
        render(
            <MainContext.Provider value={{...initialContext}}>
                <Flash/>
            </MainContext.Provider>
        );

        expect(screen.getByText('ceci est une erreur')).toBeInTheDocument(); 
    });
});