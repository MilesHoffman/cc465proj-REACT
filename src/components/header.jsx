import React from 'react'
import './../styles/header.css'
import {Link,Outlet} from 'react-router-dom'
import ProfilePageNav from './../App'
import ProfilePage from '../mainComponents/profilePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Header(){

    
    

    return(
        <div>
            <form class="mainHeader">
        <div class="topSectionHeader">

            <div class="topSectionHeaderLogo">
                <h1>Community Comrades</h1>
            </div>

            <div class="topsectionHeaderSearch">
                <input type="text" class="searchBarTextBox" placeholder="Search..."/>
            </div>

            
                <div class="topSectionHeaderRight">
                    
                <a class="badge badge-primary">
                    
                <button  class="btn btn-primary btn-sm"to="/profile" id="dropBtn">Profile</button>
                
                <button  class="btn btn-primary btn-sm"type="button" id="dropBtn">Post</button>
                </a>
                
                </div>
                
            

        </div>

        <div class="bottomSectionHeader">

            <div class="bottomSectionHeaderCategories">
                <button type="button">Technology</button>
                <button type="button">Homer</button>
                <button type="button">Apparel</button>
                <button type="button">Automobiles</button>
                <button type="button">Games</button>
            </div>

            <div class="bottomSectionHeaderRightSide">

            </div>

        </div>

    </form>
        </div>


    )

}


export default Header