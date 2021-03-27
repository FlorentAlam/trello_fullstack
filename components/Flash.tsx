import { useContext, useEffect, useState } from "react";
import { MainContext } from "../pages/_app";
import { FaTimes, FaCheck } from 'react-icons/fa';

const Flash = () => {
    const [ isActive, toggleActivity ] = useState(false);
    const { ctx } = useContext(MainContext);

    useEffect(() => {
        if(ctx.flash.message.length){
            toggleActivity(true);
        } else {
            toggleActivity(false);
        }
    }, [ctx.flash]);

    return (
        <div className={"flash " + (ctx.flash.isError ? "flash--error " : "flash--success ") + (isActive ? "flash--active" : "flash--inactive")}>
            <div className="flash-colorBar"></div>
            <div className="flash__content">
                { !ctx.flash.isError && <FaCheck/>}
                { ctx.flash.isError && <FaTimes/>}
                <p>{ ctx.flash.message }</p>
            </div>
        </div>
    )
};

export default Flash;