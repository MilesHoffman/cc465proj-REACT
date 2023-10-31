import React from 'react'
import './../styles/sidefilter.css'



const Sidefilter = () => {
  return (
    <div>
        <div class="search-filter">
            <div class="search-title-bar">
                <h1>Filter</h1>
            </div>
            <div class="search-filter-options">
                <div class="search-location">
                    <div class="search-location-label">Location</div>
                    <div class="search-location-input">
                        <input class="small" type="tel" placeholder="zipcode"/>
                        <input class="small" type="tel" placeholder="miles"/>
                    </div>
                </div>
                <div class="search-price">
                    <div class="search-price-label">Price</div>
                    <div class="search-price-input">
                        <input class="small" type="tel" placeholder="min. price"/>
                        <input class="small" type="tel" placeholder="max price"/>
                    </div>
                </div>
                <div class="search-filter-condition">
                    <label class="Condition1">
                        <input type="checkbox" name="srchType" value="T"/>
                        New/Good Condition
                    </label>
                    <label class="Condition2">
                        <input type="checkbox" name="srchType" value="T"/>
                        Used/Pre-owned
                    </label>
                    <label class="Condition3">
                        <input type="checkbox" name="srchType" value="T"/>
                        Refurbished
                    </label>
                    <label class="Condition4">
                        <input type="checkbox" name="srchType" value="T"/>
                        Damaged
                    </label>
                </div>
                <select class="search-activity">
                    <option value=""> all dates</option>
                    <option value="1"> within 30 days</option>
                    <option value="2"> beyond 30 days</option>
                </select>
                <div class="c1-command-buttons"><button type="button" tabindex="0" class="bd-button cl-exec-cancel "><span class="label">cancel</span></button><button type="button" tabindex="0" class="bd-button cl-exec-resetSearch "><span class="label">reset</span></button><button type="button" tabindex="0" class="bd-button cl-exec-search "><span class="label">apply</span></button></div>
                <div class="category-title">
                    <h1>Categories</h1>
                </div>
                <div class="categories-side-bar">
                    <a class="apparel-side">
                        <span class="apparel-label">Apparel</span>
                    </a>
                    <a class="technology-side">
                        <span class="technology-label"> Technology</span>
                    </a>
                    <a class="automobiles-side">
                        <span class="automobiles-label"> Automobiles</span>
                    </a>
                    <a class="games-side">
                        <span class="games-label"> Games</span>
                    </a>
                    <a class="home-side">
                        <span class="home-label"> Home</span>
                    </a>

                </div>
            </div>
        </div>
    </div>


    )
}



export default Sidefilter