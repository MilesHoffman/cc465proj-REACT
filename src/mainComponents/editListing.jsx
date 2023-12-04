import React, {useState} from 'react';
import '../styles/inputPages.css';
import {useLocation, useNavigate} from "react-router-dom";

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

function SubmitButton( {handler} ) {
    return (
        <form>
            <button type="button" className="btn btn-primary" onClick={handler}>Submit</button>
        </form>
    );
}

function ConditionDropdown({change, changeHandler}) {
    return (
        <div className="dropdown">
            <label>
                Condition
            </label>
            <select value={change} onChange={(e) => changeHandler(e.target.value)}>
                <option value="">Select an Option</option>
                <option value="New/Good">Good Condition</option>
                <option value="Used/Pre-Owned">Used/Pre-Owned</option>
                <option value="Refurbished">Refurbished</option>
                <option value="Damaged">Damaged</option>
            </select>
        </div>
    );

}

function CategoryDropdown({change, changeHandler}) {
    return (
        <div className="dropdown">
            <label>
                Category
            </label>
            <select value={change} onChange={(e) => changeHandler(e.target.value)}>
                <option value="">Select an Option</option>
                <option value="Apparel">Apparel</option>
                <option value="Tech">Technology</option>
                <option value="Automobiles">Automobiles</option>
                <option value="Games">Games</option>
                <option value="Home">Home</option>
            </select>
        </div>
    );
}

function EditListingContainer() {
    const routerLocation = useLocation();
    const navigate = useNavigate();
    const initialState = routerLocation.state || {}; // Access the state passed from the previous page

    const [name, setName] = useState(initialState.productName || '');
    const [locationState, setLocationState] = useState(initialState.location || '');
    const [price, setPrice] = useState(initialState.price || '');
    const [desc, setDesc] = useState(initialState.description || '');
    const [id, setID] = useState(initialState.ID || '');

    const [condition, setCondition] = useState(initialState.condition || '');
    const [category, setCategory] = useState(initialState.category || '');


    const apiUrl = 'http://localhost:5000/api/editListing'
    const handleEditFetch = async () => {
        const data = { name, locationState, price, desc, id, condition, category }
        try {
            //const formData = new FormData();

            console.log("EDIT LISTING ID: " + id);
            /*formData.append('id', id);
            formData.append('name', name);
            formData.append('location', locationState)
            formData.append('price', price);
            formData.append('desc', desc);
            formData.append('condition', condition);
            formData.append('category', category);*/

            const response = await fetch(apiUrl, {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: { "Content-Type": "application/json" },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log("Successful edit listing");
                navigate("/profile");
                window.location.reload();
            } else {
                console.log("Edit listing failed");
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

            <div className="dropdown-container">
                <ConditionDropdown change={condition}
                                   changeHandler={setCondition} />
                <br />
                <CategoryDropdown change={category}
                                  changeHandler={setCategory} />
            </div>

            <br />

            <SubmitButton
                handler={handleEditFetch}
            />
        </div>
    );

    }




export default EditListingContainer;