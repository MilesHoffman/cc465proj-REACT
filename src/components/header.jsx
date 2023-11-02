import React, {useState} from 'react'
import '../styles/header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {useNavigate} from "react-router-dom";

import LoginContainer from '../mainComponents/login.jsx';


function Header({loggedIn}) {
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    return(
        <body>
            <form className={"mainHeader"}>
                <div className={"topSectionHeader"}>

                    <div className={"topSectionHeaderLogo"}>
                        <h1>Community Comrades</h1>
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
                            <button  onClick={() => {loggedIn ? navigate('/profile') : togglePopup()}}
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
                { showPopup && <LoginContainer /> }
            </div>
        </body>

    )
}


export default Header