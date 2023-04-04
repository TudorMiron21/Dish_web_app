import { useState } from "react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  );
};

const Form = ({ username, setUsername, password, setPassword }) => {
  return (
    <div className="auth-container">
      <form>
        <h2>Regsier</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          ></input>
        </div>
        <button type="submit"> Log In</button>
      </form>
    </div>
  );
};
