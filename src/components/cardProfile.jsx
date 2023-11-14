import React, {useEffect, useState} from "react";
import './../styles/cardProfile.css'
import {useNavigate, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'


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



//this will hold the edit and delete options on card profile
function CardProfileEditDelete() {

    const [edit, setEdit] = useState(false);
    const [del , setDel] = useState(false);
    const handleEdit = () =>{

        setEdit(!edit)
        console.log(edit)

    }

    const handleDelete = () =>{

        setDel(!del)
        console.log(del)
    }

    useEffect(() => {

    }, [edit]);


    return(
      <div className="editdelete-container">
          <button onClick={handleEdit} type="button" className="btn btn-success btn-sm">Edit</button>
          <button onClick={handleDelete} type="button" className="btn btn-danger btn-sm">Delete</button>
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

    return (
        <div className="card-container" onClick={handleClick}>
            <CardPicture productImage={productImage} />

            <CardInformation productName={productName}
                             price={price}
                             location={location} />
            <CardProfileEditDelete/>
        </div>
    );
}

export default CardProfileContainer;

