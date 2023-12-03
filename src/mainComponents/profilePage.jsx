import React, {useEffect, useState} from 'react'
import '../components/cardProfile'
import '../styles/profilePage.css'
import SearchToolbar from '../components/searchtoolbar'
import CardProfile from '../components/cardProfile'
import Footer from '../components/footer'
import Card from '../components/card.jsx'

import product2 from '../assets/Classic-BMW-Motorcycles.jpg'



function ProfilePage() {

    const [listings, setListings] = useState([]);

    useEffect(() => {
        // Fetch listings when the component mounts
        const fetchListings = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/getProfile'); // Update the URL with your actual API endpoint
                if (response.ok) {
                    const data = await response.json();
                    setListings(data);
                } else {
                    console.error('Failed to fetch listings:', response.status);
                }
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };

        fetchListings();
    }, []); // Empty dependency array ensures this effect runs once when the component mounts

    listings.forEach(e => {
        console.log("category" + e.Category);
        console.log("condition" + e.Condition);
    })

    return(
        <div>
            <div id="account-homepage" class="streamlined">

            <form class="new_posting_thing" action="/login/pstrdr" method="post">
                new listing in:    <select name="areaabb">
                <option value="">choose</option>
                <option value="abz">
                    aberdeen,
                    GB       </option>
                <option value="abi">
                    abilene,
                    TX,
                    US       </option>
                <option value="aca">
                    acapulco,
                    MX       </option>
                <option value="adl">
                    adelaide,
                    SA,
                    AU       </option>
                <option value="amd">
                    ahmedabad,
                    IN       </option>
                <option value="cak">
                    akron-canton,
                    OH,
                    US       </option>
                <option value="aby">
                    albany, GA,
                    GA,
                    US       </option>
                <option value="alb">
                    albany, NY,
                    NY,
                    US       </option>
                <option value="abq">
                    albuquerque,
                    NM,
                    US       </option>
                <option value="alc">
                    alicante,
                    ES       </option>
                <option value="alt">
                    allentown,
                    PA,
                    US       </option>
                <option value="aoo">
                    altoona,
                    PA,
                    US       </option>
            </select>
                <button type="submit" value="go">go</button>
            </form>


            You have {listings.length} listing{listings.length !== 1 && 's'}</div>
            <div class="container-fluid">
                
                <div className="search-results">
                    {listings.map((card) => (
                        //prop creation for card data
                        <CardProfile
                            productName={card.Name}
                            price={card.Price}
                            location={card.Location}
                            productImage={card.Pictures}
                            description={card.Description}
                            ID={card.ID}
                            category={card.Category}
                            condition={card.Condition} />
                    ))}
                </div>
                <Footer/>
            </div>
        </div>
        
    )

}



export default ProfilePage