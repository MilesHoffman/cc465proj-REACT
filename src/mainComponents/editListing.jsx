import React, {useState} from 'react';
import '../styles/inputPages.css';
import {useLocation} from "react-router-dom";

function InputField({labelName, change, changeHandler}) {
    return(
        <form>
            <label>
                {labelName}
            </label>
            <br></br>
            <input
                style={{width: '50ch'}}
                className="inputField"
                type="text"
                value={change}
                onChange={(e) => changeHandler(e.target.value)}
            />
        </form>
    );
}
function DescriptionBox({labelName, change, changeHandler}) {
    return(
        <form>
            <label>
                {labelName}
            </label>
            <br></br>
            <p>
                <textarea
                    rows="4"
                    style={{width: '50ch'}}
                    value={change}
                    onChange={(e) => changeHandler(e.target.value)}
                ></textarea>
            </p>
        </form>
    );
}
function AddPicture({change, changeHandler}) {
    return (
        <form>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {  const file = e.target.files[0];
                    changeHandler(file);            }} />
            <br />
            {change && <img src={URL.createObjectURL(change)} alt="Uploaded" style={{maxWidth: '300px', maxHeight: '200px'}} />}
        </form>
    );
}
function SubmitButton( {handler} ) {
    return (
        <form>
            <button type="button" className="btn btn-primary" onClick={handler}>Submit</button>
        </form>
    );
}
function EditListingContainer() {
    const routerLocation = useLocation();
    const initialState = routerLocation.state || {}; // Access the state passed from the previous page

    const [name, setName] = useState(initialState.productName || '');
    const [locationState, setLocationState] = useState(initialState.location || '');
    const [price, setPrice] = useState(initialState.price || '');
    const [desc, setDesc] = useState(initialState.description || '');
    const [image, setImage] = useState(null);
    const [id, setID] = useState(initialState.ID || '');


    const apiUrl = 'http://localhost:5000/api/editListing'


    const handleEditFetch = async () => {


        try {
            const response = await fetch(apiUrl, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    ID: initialState.id,
                    Name: name,
                    Location: locationState,
                    Price:price,
                    Description: desc,


                }),

            })
            if (response.ok) {

            } else {

            }

        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    return (
        <div className="container" style={ {top: "370px"} }>
            <span>id:{id}</span>
            <InputField
                labelName="Name"
                change={name}
                changeHandler={setName} />

            <InputField
                labelName="Location"
                change={locationState}
                changeHandler={setLocationState} />

            <InputField
                labelName="Price"
                change={price}
                changeHandler={setPrice} />

            <DescriptionBox
                labelName="Description"
                change={desc}
                changeHandler={setDesc} />

            <br />

            <AddPicture
                change={image}
                changeHandler={setImage} />

            <br />

            <SubmitButton
                handler={handleEditFetch}
            />
        </div>
    );

    }




export default EditListingContainer;