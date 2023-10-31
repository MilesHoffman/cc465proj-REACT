import React from 'react'
import '../components/cardProfile'
import Header from '../components/header'
import '../styles/profilePage.css'
import SearchToolbar from '../components/searchtoolbar'
import CardProfile from '../components/cardProfile'
import Footer from '../components/footer'


function ProfilePage() {


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


            You have 1 listing</div>
            <div class="container-fluid">
                <SearchToolbar/>
                <CardProfile/>
                <Footer/>
            </div>
        </div>
        
    )

}



export default ProfilePage