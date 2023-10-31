import React from "react"
import './../styles/createListing.css'
import Header from '../components/header'





function CreateListing(){

    return(
        <div>
          
            <div class="container">

<h1>
  Create a Listing
</h1>

<span>Listing Name</span>
<form>
  <div class="form-group">
  <p>
    <label><input type="name" /></label>
  </p>
  </div>
</form>

<span>Location</span>
<form>
  <p>
    <label><input type="location" /></label>
  </p>
</form>

<span>Price</span>
<form>
  <p>
    <label><input type="text" /></label>
  </p>
</form>

<span>Product Description</span>
<form>
  <p>
    <textarea rows="4" cols="50"></textarea>
  </p>
</form>

<div  id="dropZone">
  <p>
  
    <button  class="btn btn-primary btn-sm"type="button" id="dropBtn">Add Picture</button>
    
  </p>
</div>

<form class="post">
  <p>
    <button class="btn btn-primary btn-sm" type="submit">Post</button>
  </p>
</form>

</div>
        </div>

    )

}


export default CreateListing