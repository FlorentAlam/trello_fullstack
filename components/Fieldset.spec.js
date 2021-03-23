import { fireEvent, render, screen } from "@testing-library/react";
import Fieldset from "./Fieldset";

const mockedOnChange = jest.fn(() => {});

describe("Fieldset component", () => {
    it('should render component properly', () => {
        render(
            <Fieldset
                name="test"
                label="Ceci est un test"
                type="text"
                value="testons"
                onChange={(event) => mockedOnChange(event.target.value)}
            />
        )
        expect(screen.getByLabelText("Ceci est un test")).toBeInTheDocument();
    });
    it('should trigger onChange function on input change', () => {
        render(
            <Fieldset
                name="test"
                label="Ceci est un test"
                type="text"
                value="testons"
                onChange={(event) => mockedOnChange(event.target.value)}
            />
        )

        const input = screen.getByLabelText('Ceci est un test');
        fireEvent.change(input, {target: {value: "testature"}});

        expect(mockedOnChange).toHaveBeenCalledTimes(1);
        expect(mockedOnChange).toHaveBeenCalledWith("testature");
    });
});