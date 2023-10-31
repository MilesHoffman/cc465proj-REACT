import React from 'react'
import Header from './components/header.jsx'
import Card from './components/card'
import Marketplace from './mainComponents/marketplace'
import './styles/App.css'
import ProfilePage from './mainComponents/profilePage.jsx'
import CreateListing from './mainComponents/createListing.jsx'
import CreateUser from './mainComponents/createUser.jsx'
import { BrowserRouter , Outlet, Router, Route, Link,Routes, createBrowserRouter, RouterProvider } from '../node_modules/react-router-dom';
import { ReactDOM } from 'react'
import CardProfile from './components/cardProfile.jsx'
import { useNavigate } from '../node_modules/react-router-dom'
import Login from './mainComponents/login.jsx'
import Cardtest from './components/cardtest.jsx'


const router = createBrowserRouter([


  {path:"/",
    element:<CreateUser/>,
    children:
    [
        {
          path: "/createListing",
        element:<CreateListing/>,

        },

        {
          
          path: "/profile",
          element:<ProfilePage/>
        }
]
  }
])


const App = () => {
  
  const navigate = useNavigate()

  return (
  
    <div>
      <nav>
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
                
                <button  onClick={() => navigate('/profile')} class="btn btn-primary btn-sm"to="/profile" id="dropBtn">Profile</button>
                   
                <button  onClick={() => navigate('/createListing')}class="btn btn-primary btn-sm"type="button" id="dropBtn">Post</button>
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
    </nav>
        <main>
        
          <Routes>
          <Route path="/" element={<CreateUser />} />
          <Route path="/marketplace" element={<Marketplace/>} />
          <Route path="/createListing" element={<CreateListing />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/card" element={<Cardtest/>}/>
          </Routes>
        
        </main>
     </div>

    

    
  );
}

export default App
