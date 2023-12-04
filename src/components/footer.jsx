import React from 'react'
import './../styles/profilePage.css'


function Footer() {

    return(
        <div>
            <footer>
            <ul className="profile-page-footer">
                <li>© 2023 <span className="desktop">Community Comrades</span><span className="mobile"> CC</span></li>
                <li><a>help</a></li>
                <li className="desktop"><a>privacy</a></li>



            </ul>
            </footer>
            </div>
    )

}

export default Footer