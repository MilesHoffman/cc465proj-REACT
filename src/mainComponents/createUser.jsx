import React, {useState} from 'react'
import Header from '../components/header'
import '../styles/createUser.css'


const CreateUser = () => {
  
  const [emailValue, setemailVale] = useState('')
  const [userValue, setuserValue] = useState('')
  const [pass, setPass] = useState('')
  
    return (
    <div>
        <div class="container">
        
        <span>Username</span>
            <form>
            <div class="form-group">
            <p>
                <label><input type="name" /></label>
            </p>
            </div>
            </form>
            <span>Email</span>
            <form>
            <div class="form-group">
            <p>
                <label><input type="name" /></label>
            </p>
            </div>
            </form>
            <span>Password</span>
            <form>
            <div class="form-group">
            <p>
                <label><input type="name" /></label>
            </p>
            </div>
            </form>
       
      
        <form class="post">
            <p>
                <button class="btn btn-primary btn-sm" type="submit">Submit</button>
            </p>
        </form>
        
        </div>
    </div>
  )
}

export default CreateUser