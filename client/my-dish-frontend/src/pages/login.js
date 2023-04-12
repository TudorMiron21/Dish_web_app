import { useState } from "react";
import axios, { all } from "axios";
import { useCookies } from "react-cookie";
import {useNavigate } from "react-router-dom";
import { useGetUserId } from "../hooks/useGetUserID";


import "./register.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [ _ , setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
//const location = useLocation();
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        //response form the login api that returns a token of authentication
        username,
        password,
      });

      setCookies("access_token", response.data.token);

      window.localStorage.setItem("userID", response.data.userId);
      //window.location.href = 'http://localhost:3000/';
      
      console.log(window.localStorage.getItem("userID"));
      console.log(response.data.token);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit ={onSubmit}
    />
  );
};

const Form = ({ username, setUsername, password, setPassword,onSubmit }) => {
  return (
    <div className="page">
      <div className="cover">
        <div className="logo-pic">
          <div className="picture"></div>
        </div>
        <form onSubmit={onSubmit}>
          <h2 className="register-text">Login</h2>
          <div className="form-group">
            {/* <label htmlFor="username">Username:</label> */}
            <input
              type="text"
              //id="username"
              className="form-content"

              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              placeholder="Username"
            ></input>
          </div>
          <div className="form-group">
            {/* <label htmlFor="password">Password:</label> */}
            <input
              type="password"
              id="password"
              className="form-content"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="Password"
            ></input>
          </div>
          <button type="submit" className="reg-button">
            {" "}
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
