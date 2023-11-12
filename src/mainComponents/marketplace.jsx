import React, {useEffect, useState} from 'react'
import Sidefilter from '../components/sidefilter.jsx'
import Card from '../components/card'
import './../styles/card.css'
import './../styles/marketplace.css'
import { PRODUCTS } from '../products'
import Cardtest from '../components/cardtest.jsx'
import './../styles/profilePage.css'







function Marketplace(){

    const [selectedFilters, setSelectedFilters] = useState({
        location: '',
        minimumPrice: '',
        maximumPrice: '',
        condition: [],
        category: '',
    });

    const [selectedCategory, setSelectedCategory] = useState('')

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
            location: filterData.zipcode,
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
                {filteredProducts.map((card) => (
                    //prop creation for card data
                <Cardtest key={card.id} data={card}/>
                ))}
                </div>
            <Sidefilter onApplyFilter={handleApplyFilter} />
        </div>
    )

}


export default Marketplace