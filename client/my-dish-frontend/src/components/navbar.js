import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import logo from "../images/logo.png";

export const NavBar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };
  return (
    <div className="navbar">
      <img class="logo" src={logo} alt="logo" />
      <Link className="navlink" to="/">
        {" "}
        Home{" "}
      </Link>
      <Link className="navlink" to="/create-recipe">
        {" "}
        Create Recipe{" "}
      </Link>
      <Link className="navlink" to="/saved-recipes">
        {" "}
        Saved Recipes{" "}
      </Link>
      <Link className="navlink" to="/register">
        {" "}
        Register{" "}
      </Link>
      {!cookies.access_token ? (
        <Link className="navlink" to="/login">
          {" "}
          Login{" "}
        </Link>
      ) : (
        <button onClick={logout} className="logout-button">Logout</button>
      )}

    </div>
  );
};
