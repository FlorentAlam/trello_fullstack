import { render, screen } from "@testing-library/react";
import Carte from './Carte';

describe('Carte component', () => {
    it('should render properly', () => {
        render(<Carte name="la carte"/>);

        expect(screen.getByText('la carte')).toBeInTheDocument();
    })
});