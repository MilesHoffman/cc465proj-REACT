import React, {useState} from 'react'
import '../styles/createUser.css'

function InputField({labelName, textType, change, changeHandler}) {
    return (
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
function SubmitButton() {
    return (
        <form>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
function CreateUserContainer() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passCheckbox, setPassCheckbox] = useState(false);

    return (
        <div className="container">
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

            <PasswordCheckbox
                change={passCheckbox}
                changeHandler={setPassCheckbox} />

            <SubmitButton />
        </div>
    );
}

export default CreateUserContainer


/*
function CreateUser() {
  
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  console.log(email);
  console.log(user);
  console.log(pass);

  const handleEmailChange = (e) => {
      setEmail(e.target.value);
  }
  const handleUserChange = (e) => {
      setUser(e.target.value);
  }
  const handlePassChange = (e) => {
      setPass(e.target.value);
  }
  
    return (

        <div className="container">
            <span>Email</span>
            <form>
                <div className="form-group">
                    <p>
                        <label>
                            <input type="text"
                                   value={email}
                                   onChange={handleEmailChange}
                            />
                        </label>
                    </p>
                </div>
            </form>

            <span>Username</span>
            <form>
                <div className="form-group">
                    <p>
                        <label>
                            <input type="text"
                                value={user}
                                onChange={handleUserChange}
                                />
                        </label>
                    </p>
                </div>
            </form>


            <span>Password</span>
            <form>
                <div className="form-group">
                    <p>
                        <label>
                            <input type="text"
                                   value={pass}
                                   onChange={handlePassChange}
                            />
                        </label>
                    </p>
                </div>
            </form>


            <form className="post">
                <p>
                    <button className="btn btn-primary btn-sm" type="submit">Submit</button>
                </p>
            </form>

        </div>

      )
}*/
