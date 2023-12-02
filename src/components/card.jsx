import React from "react";
import './../styles/card.css';
import {useNavigate} from "react-router-dom";

function CardPicture({productImage}) {
    return (
        <img
            src={`data:image/png;base64, ${productImage}`}
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
         <button  type="button" className="btn btn-success btn-sm save-btn">
             Save
         </button>
     </div>
    )

}
function CardContainer({productName, price, location, productImage, description, ID}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/listingPage/${productName}`, {
            state: { productName, price, location, productImage, description, ID }
        });
    };

    //truncate name
    let truncatedName = productName;
    if (productName.length > 20) {
        truncatedName = productName.substring(0, 20) + '...';
    }

    return (
            <div className="card-container" onClick={handleClick}>
              <CardPicture productImage={productImage} />

              <CardInformation productName={truncatedName}
                               price={price}
                               location={location} />
                <CardSave/>
            </div>
    );
}

export default CardContainer

