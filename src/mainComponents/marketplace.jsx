import React from 'react'
import Header from '../components/header'
import Sidefilter from '../components/sidefilter'
import Card from '../components/card'
import './../styles/card.css'
import './../styles/marketplace.css'
import { PRODUCTS } from '../products'
import Cardtest from '../components/cardtest'
import './../styles/profilePage.css'







function Marketplace(){

    return(
        <div className='marketplace'>
            
            <div className="search-results" >
                {PRODUCTS.map((card) => (
                    //prop creation for card data
                <Cardtest data={card}/>
                ))}
                </div>
            <Sidefilter/>
        </div>
    )

}


export default Marketplace