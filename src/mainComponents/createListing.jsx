import React, {useEffect, useState} from 'react';
import '../styles/inputPages.css';
import {useNavigate} from "react-router-dom";
import PopupContainer from "../components/Popup.jsx";

function InputField({labelName, change, changeHandler}) {
    return(
        <form>
            <label>
                {labelName}
            </label>
            <br></br>
            <input
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
                    value={change}
                    onChange={(e) => changeHandler(e.target.value)}
                ></textarea>
            </p>
        </form>
    );
}
function AddPicture({change, changeHandler}) {



    return (
        <div className={"addPic"}>
            <label>
                Add Picture (up to 5)
            </label>
            <form>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={changeHandler} />
            </form>
            <div className={"selectedFile"}>
                <strong>Selected Files:</strong>
                <ul>
                    {
                        change.length > 0 ? change.map((file, index) => (
                        <li key={index}>{file.fileName +  " " + (index + 1)}</li>
                    )) :
                        <>
                            <li>No files selected...</li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
}
function SubmitButton( {handler} ) {
    return (
        <form className={"submitButton"}>
            <button type="button" onClick={handler}>Submit</button>
        </form>
    );
}

function ConditionDropdown({change, changeHandler}) {
    return (
        <div className="dropdownSection">
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
        <div className="dropdownSection">
            <label>
                Category
            </label>
            <select value={change} onChange={(e) => changeHandler(e.target.value)}>
                <option value="">Select an Option</option>
                <option value="Apparel">Apparel</option>
                <option value="Technology">Technology</option>
                <option value="Automobiles">Automobiles</option>
                <option value="Games">Games</option>
                <option value="Home">Home</option>
            </select>
        </div>
    );
}

function CreateListingContainer() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState([]);

    const [condition, setCondition] = useState('');
    const [category, setCategory] = useState('');

    const handleImageChange = (e) => {
        const files = e.target.files;
        const updatedImages = Array.from(files)
        const formattedImages = updatedImages.map((pic, index) => ({
            fileName: pic.name,
            file: pic,
            type: pic.type,
        }));

        // Use spread operator to create a new array by combining existing and new files
        setImage((prevFiles) => [...prevFiles, ...formattedImages].slice(0,5));
    };

    const validateNumber = (input) => {
        // Use regex to check if the input is a valid number
        const regex = /^[0-9]*\.?[0-9]*$/;
        return regex.test(input) || input === ''; // Allow empty input as well
    };

    const apiUrl = 'http://localhost:5000/api/createListing';

    async function sendData() {

        if( name.length > 20 || name.length < 2 ){
            setPopupMsg("Invalid name");
            setIsPopup(true);
            return;
        }
        else if( location.length > 20 || location.length < 2  ){
            setPopupMsg("Location is too big or small");
            setIsPopup(true);
            return;
        }
        else if( parseInt(price) > 9999999 || parseInt(price) < 0 || !validateNumber(price) ){
            setPopupMsg("Invalid price");
            setIsPopup(true);
            return;
        }
        else if( desc.length > 1000 ){
            setPopupMsg("Description too big");
            setIsPopup(true);
            return;
        }
        else if( image.length < 1 ){
            setPopupMsg("Input an image");
            setIsPopup(true);
            return;
        }


        // Default options are marked with *
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('location', location);
            formData.append('price', price);
            formData.append('desc', desc);

            console.log("image length: " + image.length);
            image.forEach((pic, index) => {
               formData.append('images', pic.file)
               console.log(pic);
            });

            formData.append('condition', condition);
            formData.append('category', category);

            const response = await fetch(apiUrl, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: formData, // body data type must match "Content-Type" header
            })
            if (response.ok) {
                console.log("Successful create listing");
                navigate("/profile");
                window.location.reload();
            }
            else {
                console.log("Create listing failed");
            }

        }
        catch (error) {
            console.error('Error fetching data: ', error);
        }

    }

    const [isPopup, setIsPopup] = useState(false);
    const [popupMsg, setPopupMsg] = useState("");

    // Time limit for the popup
    useEffect(() => {
        if (isPopup) {
            const timerId = setTimeout(() => {
                setIsPopup(false); // After 5 seconds, set isPopup to false
            }, 5000);

            // Cleanup the timer if the component unmounts or isPopup changes
            return () => clearTimeout(timerId);
        }
    }, [isPopup]);

    return (

        <div className={"page"}>
            <div className={"inputContainer"}>
                <h1>
                    Create a Listing
                </h1>
                <InputField
                    labelName="Name"
                    change={name}
                    changeHandler={setName} />

                <InputField
                    labelName="Location"
                    change={location}
                    changeHandler={setLocation} />

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

                <AddPicture
                    change={image}
                    changeHandler={handleImageChange} />

                <SubmitButton
                    handler={sendData}
                />
            </div>

            <PopupContainer
                isPopupOpen={isPopup}
                message={popupMsg}
            />

        </div>

    );
}




export default CreateListingContainer;