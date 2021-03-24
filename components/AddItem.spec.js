import { render, screen, fireEvent } from "@testing-library/react";
import AddItem from './AddItem';

const mockedOnSubmit = jest.fn(() => {});

describe('AddItem component', () => {
    it('should render properly', () => {
        render(<AddItem onSubmit={mockedOnSubmit} buttonName="buttonText" placeholder="Item name"/>);

        expect(screen.getByText('buttonText')).toBeInTheDocument();
    });
    it('add item button should toggle the input', () => {
        render(<AddItem onSubmit={mockedOnSubmit} buttonName="buttonText" placeholder="Item name"/>);

        const button = screen.getByText('buttonText');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(button).not.toBeInTheDocument();
    });
    it('enter key on input should submit the item name', () => {
        render(<AddItem onSubmit={mockedOnSubmit} buttonName="buttonText" placeholder="Item name"/>);

        const button = screen.getByText('buttonText');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(button).not.toBeInTheDocument();

        const input = screen.getByPlaceholderText('Item name');
        expect(input).toBeInTheDocument();
        fireEvent.change(input, {target: {value: "Ceci est un test"}});
        fireEvent.keyPress(input, {key: 'Enter', code: 'Enter', charCode: 13});
        expect(input).not.toBeInTheDocument();
        expect(mockedOnSubmit).toHaveBeenCalled();
        expect(mockedOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockedOnSubmit).toHaveBeenCalledWith("Ceci est un test");
    });
});