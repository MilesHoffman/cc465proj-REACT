import React from 'react'
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import './../styles/card.css'


const CardTest = (props) => {
  
    const {id, productName, price, location, productImage} = props.data
  
    return (
        <>
        <div className='card'>
        <div className="product">
      <img src={productImage} alt="Uploaded" style={{ backgroundImage: `url(${productImage})` ,width: '100%', height: 'auto' }}/>
      <div className="description">
        <p>
          <b>{productName}</b>
          <div className='loc'>Location: {location}</div>
        </p>
        <p> ${price}</p>
        <div className='save-button'>Save</div>    
      </div>
      
    </div>
            
           

        </div>
        </>
  )
}

export default CardTest