import React from "react";
import './../styles/cardProfile.css'



function CardProfile() {

    return(
        <ol>
            <li class="box-search-result">
                <div class="card-gallery1">
                    <div id="image" class="gallery-inner">
                        <div class="dot-container">
                            <a class="main">
                                <div class="dots"><span class="dot selected">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span><span class="dot">•</span></div>
                            </a>
                            <a class="product-tag">
                                <span class="card-label">BMW Bike</span>
                            </a>
                            <button class="delete-button">Delete</button>
                        </div>
                        <div class="lower-icon-container">
                            <span class="card-location">Location: Erie,Pa</span>
                            <span class="close-x">Price:$8600</span>
                        </div>

                    </div>
                </div>
            </li>
        </ol>

    )

}

export default CardProfile