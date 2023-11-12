import React, {useState} from 'react';
import '../styles/inputPages.css';

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
function CreateListingContainer() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(null);

    const apiUrl = 'http://localhost:5000/api/createListing';

    async function sendData() {
        const data = { name, location: Llocation, price: Price, desc, image };
        // Default options are marked with *
        try {
            const response = await fetch(apiUrl, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            if (response.ok) {

            }
            else {

            }

        }
        catch (error) {
            console.error('Error fetching data: ', error);
        }

    }

    return (
        <div className="container" style={ {top: "370px"} }>
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

            <AddPicture
                change={image}
                changeHandler={setImage} />

            <br />

            <SubmitButton
                handler={sendData}
            />
        </div>
    );
}




export default CreateListingContainer;