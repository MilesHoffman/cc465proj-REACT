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
        <form className="loginSubmits standardButton">
            <button
                type={buttonType}
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

    const apiUrl = 'http://localhost:5000/api/createUser';

    async function sendData() {

        console.log("Sending Data...")

        const data = { email, username, password };

        try {
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
            if (response.ok) {
                const valid = await response.json();
                window.location.reload();
                console.log(valid.message);
            }
            else {
                console.error('Create user failed');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    return (
        <div className="container create-user-container">
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

            <div className="button-row">
                <SubmitButton
                    buttonName="RETURN TO LOGIN"
                    buttonType="button"
                    change={showPopup}
                    changeHandler={togglePopup}
                     />

                <SubmitButton
                    buttonName="CREATE USER"
                    buttonType="button"
                    changeHandler={sendData} />
            </div>
        </div>
    );
}

export default CreateUserContainer
