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
function LoginContainer() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passCheckbox, setPassCheckbox] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
          buttonType="submit"
      />

        <div>
            { showPopup && <CreateUserContainer showPopup={showPopup} togglePopup={togglePopup}/> }
        </div>
    </div>
  );
}

export default LoginContainer
