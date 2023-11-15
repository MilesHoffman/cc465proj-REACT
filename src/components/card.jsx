import React from "react";
import './../styles/card.css'
import {useNavigate, Link} from "react-router-dom";

function CardPicture({productImage}) {
    return (
        <img
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

function CardSave() {

    const handleSave = () => {




    }

    return(
     <div>
         <button  type="button" className="btn btn-success btn-sm">
             Save
         </button>
     </div>
    )

}
function CardContainer({productName, price, location, productImage, description}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/listingPage/${productName}`, {
            state: { productName, price, location, productImage, description }
        });
    };

    return (
            <div className="card-container" onClick={handleClick}>
              <CardPicture productImage={productImage} />

              <CardInformation productName={productName}
                               price={price}
                               location={location} />
                <CardSave/>
            </div>
    );
}

export default CardContainer

