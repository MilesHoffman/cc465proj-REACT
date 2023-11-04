import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/inputPages.css';

import CreateUserContainer from "./createUser.jsx";

//text fields
function InputField({labelName, textType, change, changeHandler}) {
  return(
      <form>
        <label>
          {labelName}
        </label>
        <br></br>
        <input
            style={{width: '40ch'}}
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

// Creates a submit type button using the arguments.
function SubmitButton({buttonName, buttonType, change, changeHandler}) {
  return (
      <form className="submitButtons">
        <button
            type={buttonType}
            className="btn btn-primary"
            value={change}
            onClick={changeHandler}
        >
            {buttonName}
        </button>
      </form>
  );
}

//container for elements
function LoginContainer({loggedInStatusHandler}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passCheckbox, setPassCheckbox] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const apiUrl = 'http://localhost:5000/api/login';


  async function sendData() {
      const data = {username, password}
      // Default options are marked with *
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
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error fetching data:', error))

  }

  const togglePopup = () => {
      setShowPopup(!showPopup);
  }

  return (
    <div className="container popup">
        <h1 style={{textAlign: 'center'}}>
            Login
        </h1>

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

      <br />

      <PasswordCheckbox
          change={passCheckbox}
          changeHandler={setPassCheckbox} />

      <br />

      <SubmitButton
          buttonName="CREATE USER"
          buttonType="button"
          change={showPopup}
          changeHandler={togglePopup} />

      <SubmitButton
          buttonName="LOGIN"
          buttonType="button"
          changeHandler={sendData}
      />

        <div>
            { showPopup && <CreateUserContainer showPopup={showPopup} togglePopup={togglePopup}/> }
        </div>
    </div>
  );
}

export default LoginContainer
