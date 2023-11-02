import React, {useState} from 'react'
import '../styles/inputPages.css';

function InputField({labelName, textType, change, changeHandler}) {
    return (
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
function CreateUserContainer({showPopup, togglePopup}) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passCheckbox, setPassCheckbox] = useState(false);

    return (
        <div className="container">
            <h1 style={{textAlign: 'center'}}>
                Create User
            </h1>

            <InputField
                labelName="Email"
                textType={passCheckbox}
                change={email}
                changeHandler={setEmail} />

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
                buttonName="RETURN TO LOGIN"
                buttonType="button"
                change={showPopup}
                changeHandler={togglePopup} />

            <SubmitButton
                buttonName="CREATE USER"
                buttonType="submit" />
        </div>
    );
}

export default CreateUserContainer
