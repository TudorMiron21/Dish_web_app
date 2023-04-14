import { useState } from "react";
import axios, { all } from "axios"; //used for using the backend api for registration
import "./register.css";

export const ChangeCredentials = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondpassword, setSecondPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  //submit all the data to de data base
  const onSubmit = async (event,buttonText) => {

  };

  //
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      secondpassword={secondpassword}
      setSecondPassword={setSecondPassword}
      email={email}
      setEmail={setEmail}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  secondpassword,
  setSecondPassword,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  onSubmit,
}) => {
  return (
    <div className="page">
      <div className="cover">
        <form onSubmit={onSubmit}>
          <h2 className="register-text">New Credentials</h2>
          <div className="form-group">
            <input
              type="text"
              id="username"
              className="form-content"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              className="form-content"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            ></input>
          </div>

          <div className="form-group">
            <input
              type="password"
              id="secondpassword"
              className="form-content"
              value={secondpassword}
              onChange={(event) => setSecondPassword(event.target.value)}
              placeholder="Second password"
            ></input>
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              className="form-content"
              value={email}
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            ></input>
          </div>

          <div className="form-group">
            <input
              type="text"
              id="phoneNumber"
              className="form-content"
              value={phoneNumber}
              placeholder="Phone Number"
              onChange={(event) => setPhoneNumber(event.target.value)}
            ></input>
          </div>
          <button type="submit" className="reg-button">
            {" "}
            Change
          </button>
        </form>
      </div>
    </div>
  );
};
