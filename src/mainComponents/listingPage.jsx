import React from "react";
import '../styles/listingPage.css';
import {useLocation} from "react-router-dom";
import Message from '../components/message.jsx'


function ListPicture({productImage}) {
    return (
        <img src={productImage}
             alt="Uploaded"
             className="list-img" />
    );
}

function PictureContainer({productImage}) {

    // Currently Hardcoded
    productImage = "https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/1062x597/format/jpg/quality/100/https://s.yimg.com/os/creatr-uploaded-images/2021-07/b6e88cd0-de91-11eb-bfd5-e4f634f59166"

    return (
      <div className="bodyLeftPicture">
          <ListPicture productImage={productImage}/>
      </div>
    );
}

function MakeOfferButton() {
    return (
        <form className={"standardButton dmButton"}>
            <button type="button">
                Direct Message
            </button>
        </form>
    );
}

function DescContainer({productName, price, location, description}) {

    return (

        <div className={"bodyRight"}>
            <div className="bodyRightHeader">
                <h2>
                    <span>{productName}</span>
                </h2>
                <h2>$
                    <span>{price}</span>
                </h2>
            </div>

            <div className="bodyRightAttributes">

                <div className="bodyRightFirstAttributes">
                    <div>
                        <h3>
                            <span>Condition: </span>
                        </h3>
                        Good
                    </div>
                    <div>
                        <h3>
                            <span>Location: </span>
                        </h3>
                        <span>{location}</span>
                    </div>
                </div>

                <div className="bodyRightSecAttributes">

                </div>
            </div>

            <div className="bodyRightDescription">
                <span>{description}</span>
                </div>
            <MakeOfferButton />
        </div>
    );
}

function ListingPage() {
    const location = useLocation();
    const {productName, price, location: productLocation, productImage, description} = location.state;

    return (

        <div className={"page-container"}>
            <div className="bodySection">

                <div className="bodyLeft">

                    <div className="bodyLeftPicture">
                        <PictureContainer productImage={productImage} />
                    </div>

                    <div className="bodyLeftControl standardButton">
                        <button type="button">
                            <text> back  </text>
                        </button>
                        <button type="button">
                            <text> next </text>
                        </button>
                    </div>
                </div>


                <DescContainer productName={productName} price={price}
                               location={productLocation} description={description} />

            </div>

            <div className="forumSection">

                <div className="forumHeader">
                    <h1>Join the discussion below!</h1>
                </div>

                <div className="forumAllMessages">
                    <Message
                        username={"miles hoff"}
                        message={"hello there test mes"}
                    />
                </div>

                <div className="forumFooter standardButton">
                    <button type="button">Post</button>
                    <button type="button">Report Listing</button>
                </div>

            </div>

        </div>


    );
}

export default ListingPage