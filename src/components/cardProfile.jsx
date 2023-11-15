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
function CardProfileEditDelete({ handleEdit }) {
    const navigate = useNavigate();
    const [del, setDel] = useState(false);
    const editButtonRef = useRef();

    const handleEditClick = () => {
        setDel(!del);
        console.log(del);
        handleEdit();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the edit button
            if (editButtonRef.current && !editButtonRef.current.contains(event.target)) {
                setDel(false);
            }
        };

        // Add event listener to handle clicks outside the edit button
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="editdelete-container">
            <button ref={editButtonRef} onClick={handleEditClick} type="button" className="btn btn-success btn-sm">
                Edit
            </button>
            <button onClick={() => setDel(!del)} type="button" className="btn btn-danger btn-sm">
                Delete
            </button>
        </div>
    );
}




function CardProfileContainer({productName, price, location, productImage, description}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/listingPage/${productName}`, {
            state: { productName, price, location, productImage, description }
        });
    };

    const handleEditClick = () => {
        navigate(`/editListingPage`, {
            state:{productName,price,location,productImage,description}

        });


    };

    return (

        <div>
            <div className="card-container" onClick={handleClick}>
                <CardPicture productImage={productImage}  />

                <CardInformation productName={productName}
                             price={price}
                             location={location} />

            </div>
            <div className="button-profile-container">
                <CardProfileEditDelete handleEdit={handleEditClick}/>
            </div>
        </div>
    );
}

export default CardProfileContainer;

