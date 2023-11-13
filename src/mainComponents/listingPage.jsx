import React from "react";
import '../styles/listingPage.css';
import {useLocation} from "react-router-dom";

function ListPicture({productImage}) {
    return (
        <img src={productImage}
             alt="Uploaded"
             className="list-img" />
    );
}

function PictureContainer({productImage}) {
    return (
      <div className="img-container">
          <ListPicture productImage={productImage}/>
      </div>
    );
}

function DescContainer({productName, price, location}) {
    return (
      <div className="desc-container">
          <span>{productName}</span>
          <span>{price}</span>
          <span>{location}</span>
          <span>DESCRIPTION TEST</span>
      </div>
    );
}

function ForumContainer() {
    return (
      <div className="forum-container">
          <span>FORUM</span>
      </div>
    );
}

function ListingPage() {
    const location = useLocation();
    const {productName, price, location: productLocation, productImage} = location.state;

    return (
        <div className="page-container">
            <div className="row1">
                <PictureContainer productImage={productImage}/>

                <DescContainer productName={productName}
                               price={price}
                               location={productLocation} />
            </div>
            <div className="row2">
                <ForumContainer />
            </div>
        </div>
    );
}

export default ListingPage