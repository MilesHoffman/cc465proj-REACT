import React, {useState} from 'react'
import '../styles/header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {useNavigate} from "react-router-dom";

import LoginContainer from '../mainComponents/login.jsx';


function Header({loggedInStatus, loggedInStatusHandler}) {
    const navigate = useNavigate();

    //use state value to open the login popup
    const [showPopup, setShowPopup] = useState(false);

    //function to trigger the state value, makes it simpler to use
    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    console.log("HEADER LOGGED IN STATUS: ", loggedInStatus);

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
                        <a className={"badge badge-primary"}>
                            <button  onClick={() => navigate('/createListing')}
                                     className={"btn btn-primary btn-sm"}
                                     type="button"
                                     id="dropBtn">
                                Post
                            </button>
                            <button  onClick={() => {loggedInStatus ? navigate('/profile') : togglePopup()}}
                                     className={"btn btn-primary btn-sm"}
                                     type="button"
                                     id="dropBtn">
                                Profile
                            </button>
                        </a>
                    </div>
                </div>

                <div className={"bottomSectionHeader"}>

                    <div className={"bottomSectionHeaderCategories"}>
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
                { showPopup && <LoginContainer loggedInStatus={loggedInStatus} loggedInStatusHandler={loggedInStatusHandler}/> }
            </div>
        </body>

    )
}


export default Header