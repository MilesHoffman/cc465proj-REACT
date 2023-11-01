import React, {useState} from 'react'
import './../styles/createListing.css'
import Header from '../components/header'

function InputField({labelName, change, changeHandler}) {
    return(
        <form>
            <label>
                {labelName}
            </label>
            <br></br>
            <input
                style={{maxWidth: '50ch'}}
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
                    cols="50"
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
                                                                        changeHandler(file);            }}/>
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

            <AddPicture
                change={image}
                changeHandler={setImage} />

            <SubmitButton />
        </div>
    );
}

export default CreateListingContainer

/*function CreateListing(){

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  console.log(name);
  console.log(location);
  console.log(price);
  console.log(desc);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  }
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  }

    return(
      <div className="container">
        <h1>
          Create a Listing
        </h1>

        <span>Listing Name</span>
        <form>
          <div className="form-group">
            <p>
              <label>
                <input type="text"
                       value={name}
                       onChange={handleNameChange}
                />
              </label>
            </p>
          </div>
        </form>

        <span>Location</span>
        <form>
          <p>
            <label>
              <input type="text"
                     value={location}
                     onChange={handleLocationChange}
              />
            </label>
          </p>
        </form>

        <span>Price</span>
        <form>
          <p>
            <label>
              <input type="text"
                     value={price}
                     onChange={handlePriceChange}
              />
            </label>
          </p>
        </form>

        <span>Product Description</span>
        <form>
          <p>
            <textarea rows="4"
                      cols="50"
                      value={desc}
                      onChange={handleDescChange}
            ></textarea>
          </p>
        </form>

        <div  id="dropZone">
          <p>
            <button  className="btn btn-primary btn-sm"type="button" id="dropBtn">Add Picture</button>
          </p>
        </div>

        <form className="post">
          <p>
            <button className="btn btn-primary btn-sm" type="submit">Post</button>
          </p>
        </form>

      </div>
    )
}*/

