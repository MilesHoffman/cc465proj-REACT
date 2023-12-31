import React, {useEffect, useState} from "react";
import './../styles/cardProfile.css'
import {useNavigate, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import {useRef} from "react";
import {useLocation} from 'react-router-dom'
function CardPicture({productImage}) {

    const handleListing = () => {


    }

    return (
        <img
            onClick={handleListing}
            src={`data:image/png;base64, ${productImage[0].file}`}
            alt="Uploaded"
            className="card-img" />
    );
}
function CardInformation({productName, location, price}) {
    return (
        <div className="card-info">
            <div className={"cardName"}>
                <span>{productName}</span>
            </div>

            <div className={"cardPrice"}>
                <span>${price}</span>
            </div>

            <div className={"cardLocation"}>
                <span>{location}</span>
            </div>

        </div>
    );
}



//this will hold the edit and delete options on card profile
function CardProfileEdit({ handleEdit }) {
    const navigate = useNavigate();
    const [del, setDel] = useState(false);
    const editButtonRef = useRef();








    return (
        <div className="cardButton standardButton">
            <button ref={editButtonRef} onClick={handleEdit} type="button">
                Edit
            </button>

        </div>
    );
}

function CardProfileDelete({ handleDelete }) {

    const [del, setDel] = useState(false)
    const deleteButtonRef = useRef();

    const handleDel = () => {
        setDel(!del);
    };
    /*
    delete update
     */

    return(
        <div className='standardButton cardButton'>
            <button ref={deleteButtonRef} onClick={() => { handleDelete(); handleDel(); }}  type="button">
                Delete
            </button>
        </div>
    )
}




function CardProfileContainer({productName, price, location, productImage, description, ID, condition, category}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/listingPage/${productName}`, {
            state: {productName, price, location, productImage, description, condition, category, ID}
        });
    };

    const handleEditClick = () => {
        navigate(`/editListingPage`, {
            state: {productName, price, location, productImage, description, ID, condition, category}

        });

    };



    const apiUrl = 'http://localhost:5000/api/deleteListing'

    //to fetch delete listing api
    async function handleDeleteClick () {

        try{
            const response = await fetch(apiUrl, {
                method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    ID: ID,
                }),

            })
            if(response.ok){
                const valid = await response.json();
                window.location.reload();
                console.log(valid);
            }
            else{

            }
        }
        catch (error){
            console.error('error fetching data', error);
        }

    }

    return (

        <div className="card-container-profile">
            <div onClick={handleClick}>
                <CardPicture productImage={productImage}/>

                <CardInformation productName={productName}
                                 price={price}
                                 location={location}/>

            </div>
            <div className="button-profile-container">
                <CardProfileEdit  handleEdit={handleEditClick}   />

                <CardProfileDelete handleDelete={handleDeleteClick}/>

            </div>


        </div>
    );

}
export default CardProfileContainer;