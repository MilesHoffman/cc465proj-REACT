import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './../styles/login.css'

//text fields
function InputField({labelName, textType, change, changeHandler}) {
  return(
      <form>
        <label>
          {labelName}
        </label>
        <br></br>
        <input
            style={{maxWidth: '50ch'}}
            className="inputField"
            type={(!textType && labelName==="Password") ? "password" : "text"}
            value={change}
            onChange={(e) => changeHandler(e.target.value)}
        />
      </form>
  );
}

//show password checkbox
function PasswordCheckbox({change, changeHandler}) {
  return (
      <form>
        <input
            type="checkbox"
            className="form-check-input"
            value={change}
            onChange={(e) => changeHandler(e.target.checked)}
        />
        <label>Show Password</label>
      </form>
  );
}

//submit button
function SubmitButton() {
  return (
      <form>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  );
}

//container for elements
function LoginContainer() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passCheckbox, setPassCheckbox] = useState(false);

  return (
    <div className="container">
      <InputField
          labelName="Username"
          textType={passCheckbox}
          change={username}
          changeHandler={setUsername} />

      <InputField
          labelName="Password"
          textType={passCheckbox}
          change={password}
          changeHandler={setPassword} />

      <PasswordCheckbox
          change={passCheckbox}
          changeHandler={setPassCheckbox} />

      <SubmitButton />
    </div>
  );
}

export default LoginContainer

/*function Login(){

  //state variables and handlers
  const [userEm, setUserEm] = useState('');
  const [userPass, setUserPass] = useState('');

  //log in console through inspect element
  console.log(userEm)
  console.log(userPass)

  //handlers
  const handleEmailChange = (e) => {
    setUserEm(e.target.value);
  }
  const handlePassChange = (e) => {
    setUserPass(e.target.value);
  }

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            value={userEm}
            onChange={handleEmailChange}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            value={userPass}
            onChange={handlePassChange}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <div className="row2">
      </div>
    </div>
  )
}*/