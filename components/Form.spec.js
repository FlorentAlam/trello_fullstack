import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Form from "./Form";

const mockedSubmit = jest.fn(() => {});

const MockedChild = () => {
    return (
        <>
            <label htmlFor="test">Ceci est un test</label>
            <input type="text" name="test" id="test" value="ok"/>
        </>
    )
}

describe('Form component', () => {
    it('should render component properly', () => {
        render(<Form buttonName="testButton" submitAction={mockedSubmit}><MockedChild/></Form>);

        expect(screen.getByLabelText("Ceci est un test")).toBeInTheDocument();
        expect(screen.getByText("testButton")).toBeInTheDocument();
    });
    it('should trigger submition on button click', () => {
        render(<Form buttonName="testButton" submitAction={mockedSubmit}><MockedChild/></Form>);

        const submitButton = screen.getByText("testButton");
        fireEvent.click(submitButton);

        expect(mockedSubmit).toHaveBeenCalled();
        expect(mockedSubmit).toHaveBeenCalledTimes(1);
    });
});