import { useState } from "react";
import axios, { all } from "axios"; //used for using the backend api for registration
import "./register.css";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondpassword, setSecondPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  //submit all the data to de data base
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
        email,
        phoneNumber
      });
      alert("Registartion Completed! Now login.");
    } catch (err) {
      console.error(err);
    }
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
          <h2 className="register-text">Regsier</h2>
          <div className="form-group">
            <input
              type="text"
              id="username"
              className="form-content"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              required
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
              required
            ></input>
          </div>

          <div className="form-group">
            <input
              type="password"
              id="secondpassword"
              className="form-content"
              value={secondpassword}
              onChange={(event) => setSecondPassword(event.target.value)}
              required
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
            Register
          </button>
        </form>
        <p className="text">Or login using:</p>

        <div className="alt-login">
          <div className="facebook"></div>
          <div className="google"></div>
        </div>
      </div>
    </div>
  );
};
