import React from "react";
import './../styles/card.css';
import {useNavigate, useLocation} from "react-router-dom";

function CardPicture({productImage}) {
    return (
        <img
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


function CardContainer({productName, price, location, productImage, description, ID}) {
    const navigate = useNavigate();
    console.log("IN CARD: ", productImage);
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

              <CardPicture
                  productImage={productImage}
              />

              <CardInformation
                  productName={truncatedName}
                  price={price}
                  location={location}
              />

            </div>
    );
}

export default CardContainer

