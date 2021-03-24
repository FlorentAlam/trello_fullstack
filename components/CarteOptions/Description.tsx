import { FunctionComponent } from "react";

interface IDescriptionProps{
    description: string
}

const Description: FunctionComponent<IDescriptionProps> = ({ description }) => {
    return (
        <div>
            <h2>Description</h2>
            <p>{ description }</p>
        </div>
    )
};

export default Description;