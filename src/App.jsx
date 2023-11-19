import React, {useEffect, useState} from 'react'
import Header from './components/header.jsx'
import Card from './components/card'
import Marketplace from './mainComponents/marketplace'
import './styles/mainStyle.css'
import ProfilePage from './mainComponents/profilePage.jsx'
import CreateListing from './mainComponents/createListing.jsx'
import CreateUser from './mainComponents/createUser.jsx'
import { Outlet, Link, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactDOM } from 'react'
import CardProfile from './components/cardProfile.jsx'
import { useNavigate } from '../node_modules/react-router-dom'
import Login from './mainComponents/login.jsx'
import CardTest from './components/cardtest.jsx'
import EditListing from "./mainComponents/editListing.jsx";
import ListingPage from './mainComponents/listingPage.jsx'
import EditListingContainer from "./mainComponents/editListing.jsx";


function App() {
    let [loggedInStatus, setLoggedInStatus] = useState(false);
    const [currentUser, setCurrentUser] = useState('');

    const toggleLoggedInStatus = (state, username) => {
        setLoggedInStatus(state);
        setCurrentUser(username);
        sessionStorage.setItem('loggedInStatus', state);
        sessionStorage.setItem('currentUser', username);
    }
    console.log("LOGGED IN STATUS: ", loggedInStatus);
    console.log("CURRENT USER: ", currentUser);


    useEffect(() => {
        // Check if there's a stored login status in sessionStorage
        const storedLoggedInStatus = sessionStorage.getItem('loggedInStatus');
        const storedCurrentUser = sessionStorage.getItem('currentUser');
        if (storedLoggedInStatus === 'true') {
            setLoggedInStatus(true);
        }
        if (storedCurrentUser !== '') {
            setCurrentUser(storedCurrentUser)
        }
    }, []);

  return (
    <body>
      <nav>
          <div className={Header}>
              <Header loggedInStatus={loggedInStatus} loggedInStatusHandler={toggleLoggedInStatus}/>
          </div>
      </nav>
      <main>

          <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/createListing" element={<CreateListing />} />
          <Route path="/profile" element={<ProfilePage />} />
              <Route path="/listingPage/:productName" element={<ListingPage />} />
          <Route path="/editListingPage" element={<EditListing/>} />
          <Route path="/card" element={<CardTest/>}/>
          </Routes>


        </main>
     </body>
  );
}

export default App