import React from 'react'
import Header from './components/header.jsx'
import Card from './components/card'
import Marketplace from './mainComponents/marketplace'
import './styles/mainStyle.css'
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
  


  return (
  
    <div>
      <nav>
          <div className={Header}>
              <Header></Header>
          </div>
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
