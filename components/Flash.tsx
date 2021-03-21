import { useContext, useEffect, useState } from "react";
import { MainContext } from "../pages/_app";

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
            <p>{ ctx.flash.message }</p>
        </div>
    )
};

export default Flash;