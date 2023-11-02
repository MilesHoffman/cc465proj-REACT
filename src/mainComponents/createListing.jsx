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
function SubmitButton() {
    return (
        <form>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
function CreateListingContainer() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(null);

    return (
        <div className="container">
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

            <SubmitButton />
        </div>
    );
}

export default CreateListingContainer

