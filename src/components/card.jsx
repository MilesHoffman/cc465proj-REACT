import React from "react";
import './../styles/card.css'



const Card = (props) => {
    
    const {id, productName, price, location, productImage} = props.data


    return(
        <div>
            <ol>
                <li class="box-search-result">
                    <div class="card-gallery1">
                    <img src="" className="card-img-top" style={{ backgroundImage: `url(${productImage})` ,width: '100%', height: 'auto' }}/>
                        <div id="image" class="gallery-inner">
                        
                        
                            <div class="dot-container">
                                <a class="main">
                                    <div class="dots"><span class="dot selected">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span></div>
                                </a>
                                <a class="product-tag">
                                    <span class="card-label">{productName}</span>
                                </a>
                                <button class="save-button">Save</button>
                            </div>
                            <div class="lower-icon-container">
                                <span class="card-location">Location: {location}</span>
                                <span class="close-x">Price:${price}</span>
                            </div>

                        </div>
                    </div>
                </li>
            </ol>

        </div>
    )


}


export default Card

