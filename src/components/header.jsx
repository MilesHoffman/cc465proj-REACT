import React, {useState, useRef} from 'react'
import '../styles/header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {useNavigate} from "react-router-dom";

import LoginContainer from '../mainComponents/login.jsx';


function Header({loggedInStatus, loggedInStatusHandler}) {
    const navigate = useNavigate();

    //use state value to open the login popup
    const [showPopup, setShowPopup] = useState(false);

    //closing login popup
    const buttonRef = useRef(null);

    //function to trigger the state value, makes it simpler to use
    const togglePopup = (state) => {
        setTimeout(() => {
            setShowPopup(state);
        }, 0);
    }

    console.log("HEADER LOGGED IN STATUS: ", loggedInStatus);
    console.log("POPUP LOGIN STATUS: ", showPopup);

    return(
        <body>
            <form className={"mainHeader"}>
                <div className={"topSectionHeader"}>

                    <div className={"topSectionHeaderLogo"}>
                        <button onClick={() => navigate('/')}
                                type="button">
                            Community Comrades
                        </button>
                    </div>

                    <div className={"topsectionHeaderSearch"}>
                        <input type="text" className={"searchBarTextBox"} placeholder="Search..."/>
                    </div>

                    <div className={"topSectionHeaderRight"}>
                        <a>
                            <button  onClick={() => navigate('/createListing')}
                                     type="button"
                                     id="dropBtn">
                                Post
                            </button>
                            <button  onClick={() => {loggedInStatus ? navigate('/profile') : togglePopup(!showPopup)}}
                                     type="button"
                                     id="dropBtn"
                                     ref={buttonRef}>
                                {loggedInStatus ? "Profile" : "Login"}
                            </button>
                        </a>
                    </div>
                </div>

                <div className={"bottomSectionHeader"}>

                    <div className={"bottomSectionHeaderCategories sneakyButton"}>
                        <button type="button">Technology</button>
                        <button type="button">Home</button>
                        <button type="button">Apparel</button>
                        <button type="button">Automobiles</button>
                        <button type="button">Games</button>
                    </div>

                    <div className={"bottomSectionHeaderRightSide"}>

                    </div>

                </div>

            </form>
            <div>
                { showPopup && <LoginContainer
                                               loggedInStatusHandler={loggedInStatusHandler}

                                               loginPopup={showPopup}
                                               loginPopupHandler={togglePopup}
                                               buttonRef={buttonRef} />
                }
            </div>
        </body>

    )
}


export default Header