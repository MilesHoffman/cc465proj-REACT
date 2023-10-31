import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './../styles/login.css'
import {useRef, useState, useEffect} from 'react'


function Login(){

  

  const userRef = useRef();
  

  const [userEm, setUserEm] = useState("");
  const [userPass, setUserPass] = useState({ pass: ""});
  useEffect(() => {

    userRef.current.focus();
  },[])
  console.log(userEm)
  console.log(userPass)
  const handleChange = (e) => {

    setUserEm({
        //updating object state
      ...userEm,
      email: e.target.value,
    });

    setUserPass({

      ...userPass,
      pass: e.target.value,

    });
  
  };

  

  


  return (
    <div>
    <div class="container">
    <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input 
    onChange={handleChange}
    type="email" 
    class="form-control" 
    id="exampleInputEmail1" 
    aria-describedby="emailHelp"
    
    
    
    />
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input 
    onChange={handleChange} 
    type="password" 
    class="form-control" 
    id="exampleInputPassword1"
    ref={userRef}
    required
    />
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

        <div class="row2">
            
        </div>
    </div>
    </div>
  )
}

export default Login