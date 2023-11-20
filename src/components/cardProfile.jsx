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
            src={productImage}
            alt="Uploaded"
            className="card-img" />
    );
}
function CardInformation({productName, location, price}) {
    return (
        <div className="card-info">
            <span>{productName}</span>
            <br />
            <span>${price}</span>
            <br />
            <span>{location}</span>
        </div>
    );
}



//this will hold the edit and delete options on card profile
function CardProfileEdit({ handleEdit }) {
    const navigate = useNavigate();
    const [del, setDel] = useState(false);
    const editButtonRef = useRef();








    return (
        <div className="editdelete-container">
            <button ref={editButtonRef} onClick={handleEdit} type="button" className="btn btn-success btn-sm">
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

    useEffect(() => {
        if (del) {
            // Reload the page when del state changes
            window.location.reload();
        }
    }, [del]);

    /*
    delete update
     */

    return(
        <div className='editdelete-container'>
            <button ref={deleteButtonRef} onClick={() => { handleDelete(); handleDel(); }}  type="button" className="btn btn-danger btn-sm">
                Delete
            </button>
        </div>
    )
}




function CardProfileContainer({productName, price, location, productImage, description, ID}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/listingPage/${productName}`, {
            state: {productName, price, location, productImage, description}
        });
    };

    const handleEditClick = () => {
        navigate(`/editListingPage`, {
            state: {productName, price, location, productImage, description, ID}

        });

    };

    let truncatedName = productName;
    if (productName.length > 20) {
        truncatedName = productName.substring(0, 20) + '...';
    }


    const apiUrl = 'http://localhost:5000/api/deleteListing'




    //to fetch delete listing api
    async function handleDeleteClick () {






        try{
            const response = await fetch(apiUrl, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
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


            }else{

            }
        }
        catch (error){
            console.error('error fetching data', error);
        }

    }















    return (

        <div className="card-container">
            <div onClick={handleClick}>
                <CardPicture productImage={productImage}/>

                <CardInformation productName={truncatedName}
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