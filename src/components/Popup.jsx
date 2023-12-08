import "../styles/PopupStyle.css"
import {useEffect, useState} from "react";

function PopupBody({isPop, message} ){

    if( isPop ){
        return(
            <div className={"PopupContainer"}>
                <text>
                    {message}
                </text>
            </div>
        )
    }
    else{
        return(
            <></>
        )
    }
}

function PopupContainer({isPopupOpen, message}) {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        setIsVisible(isPopupOpen)
    }, [isPopupOpen]);

    return(
        <div>
            <PopupBody
                isPop={isVisible}
                message={message}
            />
        </div>
    );
}

export default PopupContainer