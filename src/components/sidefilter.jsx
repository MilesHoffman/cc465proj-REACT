import React, {useEffect, useState, useRef} from 'react'
import './../styles/sidefilter.css'
import app from "../App.jsx";



function Sidefilter({ onApplyFilter , onCategoriesFilter, callSetListings})  {
    //states to filter items on sidebar
    const [City, setCity] = useState('');
    const [Zipcode, setZipcode] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [Condition1, setCondition1] = useState(false);
    const [Condition2, setCondition2] = useState(false);
    const [Condition3, setCondition3] = useState(false);
    const [Condition4, setCondition4] = useState(false);
    const [selectedSide, setSelectedSide] = useState('');





    // Update filterData whenever the state values change
    useEffect(() => {



        const filterData = {
            City,
            Zipcode,
            minPrice,
            maxPrice,
            conditions: {
                'New/Good': Condition1,
                'Used/Pre-owned':Condition2,
                'Refurbished':Condition3,
                'Damaged':Condition4
            },
            selectedSide,
        };
        console.log('filtered data', filterData);
    }, [City, Zipcode, minPrice, maxPrice, selectedSide]);


    //whenever apply button mounts we will send api fetch call to get listings from express api






    //event handlers for side filter



    const handleCityChange = (event) => {

        setCity(event.target.value);
    }
    const handleZipcodeChange = (event) => {
        setZipcode(event.target.value);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const handleCondition1Change = () => {
        setCondition1(!Condition1);
    };

    const handleCondition2Change = () => {
        setCondition2(!Condition2);
    };

    const handleCondition3Change = () => {
        setCondition3(!Condition3);
    };

    const handleCondition4Change = () => {
        setCondition4(!Condition4);
    };

    const handleActivityChange = (event) => {
        setSelectedSide(event.target.value);
    };

    //make a handler for categories where we will send to parent component (marketplace).
    const handleCategoriesFilter = (category) => {

        setSelectedSide(category);

        onCategoriesFilter(category)



    }

    //when we click apply it will capture all the current state and put into filterData
    const handleApplyFilter = async () => {



        const filterData = {
            City,
            Zipcode,
            minPrice,
            maxPrice,
            conditions: {
                'New/Good': Condition1,
                'Used/Pre-owned':Condition2,
                'Refurbished':Condition3,
                'Damaged':Condition4
            },
            selectedSide,
        };

        console.log('filtered data', filterData);

        // Call the Express API to send the filterData
        const apiUrl = 'http://localhost:5000/api/getListings';

        try {
            const response = await fetch(apiUrl, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(filterData),
            });

            if (response.ok) {

                const result = await response.json();
                callSetListings(result);
            }
            else {
                console.error('Failed to send data to the API');
            }
        } catch (error) {
            console.error('Error sending data to the API:', error);
        }

        // Call the onApplyFilter prop to pass the filtered data to the parent component
        onApplyFilter(filterData);

    };


    // Reset all state variables to their initial values
    const CityRef = useRef()
    const ZipcodeRef = useRef()
    const minPriceRef = useRef()
    const maxPriceRef = useRef()
    const condition1Ref = useRef(null);
    const condition2Ref = useRef(null);
    const condition3Ref = useRef(null);
    const condition4Ref = useRef(null);


    const handleResetFilter = () => {
        CityRef.current.value = '';
        ZipcodeRef.current.value = '';
        minPriceRef.current.value = '';
        maxPriceRef.current.value = '';
        // ... reset other input fields using their refs
        // Reset checkbox values using refs
        condition1Ref.current.checked = false;
        condition2Ref.current.checked = false;
        condition3Ref.current.checked = false;
        condition4Ref.current.checked = false;
        setSelectedSide('');
    };




  return (
    <div>
        <div className="search-filter">
            <div className="search-title-bar"></div>
            <div className="search-filter-options">
                <div className="search-location">
                    <h1>Location</h1>
                    <div className="search-input">
                        <input  ref={CityRef} onChange={handleCityChange} type="tel" placeholder="City"/>
                        <input  ref={ZipcodeRef} onChange={handleZipcodeChange} type="tel" placeholder="Zipcode"/>
                    </div>
                </div>
                <div className="search-price">
                    <h1>Price</h1>
                    <div className="search-input">
                        <input  ref={minPriceRef} onChange={handleMinPriceChange} type="tel" placeholder="min. price"/>
                        <input  ref={maxPriceRef} onChange={handleMaxPriceChange} type="tel" placeholder="max price"/>
                    </div>
                </div>
                <div className="search-filter-condition">
                    <h1>Condition</h1>
                    <label className="condition">
                        <input  ref={condition1Ref} onChange={handleCondition1Change} type="checkbox" name="srchType" value="T"/>
                          <text> Good Condition</text>
                    </label>
                    <label className="condition">
                        <input  ref={condition2Ref} onChange={handleCondition2Change} type="checkbox" name="srchType" value="T"/>
                        <text> Used/Pre-owned</text>
                    </label>
                    <label className="condition">
                        <input  ref={condition3Ref} onChange={handleCondition3Change} type="checkbox" name="srchType" value="T"/>
                        <text> Refurbished</text>
                    </label>
                    <label className="condition">
                        <input  ref={condition4Ref} onChange={handleCondition4Change} type="checkbox" name="srchType" value="T"/>
                        <text> Damaged</text>
                    </label>
                </div>
                <select  className="search-activity" value={selectedSide} onChange={handleActivityChange}>
                    <option value=""> all dates</option>
                    <option value="1"> within 30 days</option>
                    <option value="2"> beyond 30 days</option>
                </select>
                <div className="standardButton filterCommandButtons">
                    <button type="button" tabindex="0">
                        <span className="label">cancel</span>
                    </button>
                    <button type="button" onClick={handleResetFilter} tabindex="0">
                        <span className="label">reset</span>
                    </button>
                    <button type="button" onClick={handleApplyFilter}  tabindex="0">
                        <span className="label">apply</span>
                    </button>
                </div>

                <div className={"category-title"}>
                    <h1>Categories</h1>
                </div>

                <div className="categories-side-bar sneakyButton">
                    <button onClick={() => handleCategoriesFilter('Apparel')}>
                        <span>Apparel</span>
                    </button>
                    <button onClick={() => handleCategoriesFilter('Technology')}>
                        <span>Technology</span>
                    </button>
                    <button onClick={() => handleCategoriesFilter('Automobile')}>
                        <span>Automobiles</span>
                    </button>
                    <button onClick={() => handleCategoriesFilter('Games')}>
                        <span>Games</span>
                    </button>
                    <button onClick={() => handleCategoriesFilter('Home')}>
                        <span>Home</span>
                    </button>

                </div>
            </div>
        </div>
    </div>


    )
}



export default Sidefilter