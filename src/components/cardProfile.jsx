import React, {useEffect, useState} from "react";
import './../styles/cardProfile.css'
import {useNavigate, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import {useRef} from "react";

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
function CardProfileEditDelete({ handleEdit , handleDelete}) {
    const navigate = useNavigate();
    const [del, setDel] = useState(false);
    const editButtonRef = useRef();

    const handleEditClick = () => {

        handleEdit();
    };

    const handleDeleteClick = () => {

        console.log(del);
        handleDelete();

    }







    return (
        <div className="editdelete-container">
            <button ref={editButtonRef} onClick={handleEdit} type="button" className="btn btn-success btn-sm">
                Edit
            </button>
            <button onClick={handleDeleteClick} type="button" className="btn btn-danger btn-sm">
                Delete
            </button>
        </div>
    );
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





    return (

        <div className="card-container">
            <div onClick={handleClick}>
                <CardPicture productImage={productImage}/>

                <CardInformation productName={productName}
                                 price={price}
                                 location={location}/>

            </div>
            <div className="button-profile-container">
                <CardProfileEditDelete handleEdit={handleEditClick} />
            </div>
        </div>
    );

}
export default CardProfileContainer;