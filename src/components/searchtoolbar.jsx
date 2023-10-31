import React from 'react'
import Header from './header'
import Sidefilter from '../components/sidefilter'
import Card from '../components/card'
import './../styles/card.css'
import './../styles/profilePage.css'



function SearchToolbar() {

    return(
        <div>
            <div class="search-toolbar">
                    <div class="search-tool-left">
                        <select class="search-results-time">
                            <option value=""> newest</option>
                            <option value="1"> oldest</option>
                            </select>
                    </div>
                    <div class="page-change">
                        <div class="leftArrowButton-container">
                            <button id="leftArrowButton">← Previous</button>
                        </div>
                        <span class="page-number">1 - 30 of 30</span>
                        <div class="rightArrowButton-container">
                            <button id="rightArrowButton">Next →</button>
                        </div>
                    </div>
                </div>
        </div>

    )


}


export default SearchToolbar