import React, {useEffect, useState} from 'react'
import Sidefilter from '../components/sidefilter.jsx'
import Card from '../components/card'
import { PRODUCTS } from '../products'
import './../styles/marketplace.css'


function Marketplace(){

    //array to hold all listings
    const [listings, setListings] = useState([]);

    function callSetListings( listings ){
        setListings(listings);
    }

    //to hold state of filters
    const [selectedFilters, setSelectedFilters] = useState({
        location: '',
        minimumPrice: '',
        maximumPrice: '',
        condition: [],
        category: '',
    });

    const [selectedCategory, setSelectedCategory] = useState('')

    useEffect(() => {
        // Fetch listings when the component mounts
        const fetchListings = async () => {
            try {
                const filterData = { query: false };
                const apiUrl = "http://localhost:5000/api/getListings"
                const response = await fetch(apiUrl, {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(filterData),
                });
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

    //handles the category
    const [categoryFilteredProducts, setCategoryFilteredProducts] = useState(PRODUCTS);

    useEffect(() => {
        // Apply category filter when the category changes
        const filteredByCategory = PRODUCTS.filter(
            (product) => !selectedFilters.category || product.category.toLowerCase() === selectedFilters.category.toLowerCase()
        );
        setCategoryFilteredProducts(filteredByCategory);
    }, [selectedFilters.category]);

    const handleApplyFilter = (filterData) => {
        // Update the selectedFilters state with the filter data
        setSelectedFilters({
            location: filterData.City,
            minimumPrice: filterData.minPrice,
            maximumPrice: filterData.maxPrice,
            condition: getSelectedConditions(filterData),
            category: filterData.selectedSide,
        });
        console.log('Selected filters in Marketplace:', selectedFilters);
    };
    //makes the filtered conditions have string
    const getSelectedConditions = (filterData) => {
        const conditions = [
            filterData.Condition1 && 'New/Good Condition',
            filterData.Condition2 && 'Used/Pre-owned',
            filterData.Condition3 && 'Refurbished',
            filterData.Condition4 && 'Damaged',
        ];

        return conditions.filter(Boolean);
    };



    // Filter the products based on selected filters
    const filteredProducts = categoryFilteredProducts.filter((product) => {
        // Implement your filtering logic here based on selectedFilters
        // Example: Check if product location matches selected location
        return (
            (!selectedFilters.location || product.location.toLowerCase() === selectedFilters.location.toLowerCase()) &&
            (!selectedFilters.minimumPrice || product.price >= selectedFilters.minimumPrice) &&
            (!selectedFilters.maximumPrice || product.price <= selectedFilters.maximumPrice) &&
            (selectedFilters.condition.length === 0 || selectedFilters.condition.includes(product.condition)) &&
            (!selectedFilters.category || product.category.toLowerCase() === selectedFilters.category.toLowerCase())

        );

    });




    return(
        <div className='marketplace'>

            <div className="search-results" >
                {listings.map((card) => (
                    //prop creation for card data
                <Card productName={card.Name}
                      price={card.Price}
                      location={card.Location}
                      productImage={card.Pictures}
                        description={card.Description}
                        id={card.ID}/>
                ))}
            </div>
            <Sidefilter onApplyFilter={handleApplyFilter} callSetListings={callSetListings} />
        </div>
    )

}


export default Marketplace