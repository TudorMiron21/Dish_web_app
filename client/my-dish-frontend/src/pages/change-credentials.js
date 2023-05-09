import { useState, useEffect } from "react";
import axios, { all } from "axios"; //used for using the backend api for registration
import "./register.css";
import { useGetUserId } from "../hooks/useGetUserID";
export const ChangeCredentials = () => {
  const userID = useGetUserId();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondpassword, setSecondPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [recv_username, setRecvUsername] = useState("");
  const [recv_email, setRecvEmail] = useState("");
  const [recv_phoneNumber, setRecvPhoneNumber] = useState("");

  //submit all the data to de data base
  const onSubmit = async (event, buttonText) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:3001/auth/changeCredentials",
        {
          userID,
          username,
          password,
          email,
          phoneNumber,
        }
      );

      alert(response.data);

    } catch (err) {
      console.log(err);
    }
  };

  const getCredentials = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/auth/register/${userID}`
      );
      console.log(response.data);
      setRecvUsername(response.data.user.username);
      setRecvEmail(response.data.user.email);
      setRecvPhoneNumber(response.data.user.phoneNumber);
      console.log(userID);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCredentials();
  }, []);

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
      recv_username={recv_username}
      recv_email={recv_email}
      recv_phoneNumber={recv_phoneNumber}
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
  recv_username,
  recv_email,
  recv_phoneNumber,
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
              value={username} // Use the username prop here
              onChange={(event) => setUsername(event.target.value)}
              placeholder={recv_username}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              className="form-content"
              value={password} // Use the password prop here
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              id="secondpassword"
              className="form-content"
              value={secondpassword} // Use the secondpassword prop here
              onChange={(event) => setSecondPassword(event.target.value)}
              placeholder="Second password"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              className="form-content"
              value={email} // Use the email prop here
              placeholder={recv_email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              id="phoneNumber"
              className="form-content"
              value={phoneNumber} // Use the phoneNumber prop here
              placeholder={recv_phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>
          <button type="submit" className="reg-button">
            Change
          </button>
        </form>
      </div>
    </div>
  );
};
