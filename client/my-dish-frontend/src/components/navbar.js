import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useGetUserName } from "../hooks/useGetUserName";
import logo from "../images/logo.png";

export const NavBar = () => {
  const username = useGetUserName();
  const navRef = useRef();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };
  const isAdmin = username === "admin";
  return (
    <header className="navbar">
      <img className="logo" src={logo} alt="logo" />

      {/* <nav ref={navRef}> */}

      <Link className="navlink" to="/">
        {" "}
        Home{" "}
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
        <>
          {isAdmin &&(
            <>
              {
                <Link className="navlink" to="/delete-recipes">
                  Delete Recipes
                </Link>
              }
              <Link className="navlink" to="/create-recipe">
                Create Recipe{" "}
              </Link>
            </>
          )}

          <Link className="navlink" to="/saved-recipes">
            Saved Recipes
          </Link>

          <Link className="navlink" to="/change-credentials">
            Change Credentials
          </Link>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </>
      )}
      {/* </nav> */}
    </header>
  );
};
