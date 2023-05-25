import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useGetUserName } from "../hooks/useGetUserName";
import logo from "../images/logo.png";
import React, { useState } from "react";

export const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const username = useGetUserName();
  const navRef = useRef();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchEventHandle = ()=>{
    navigate('/main-listing?argValue='+searchQuery)
  }
  const isAdmin = username === "admin";
  return (
    <header className="navbar">
      <img className="logo" src={logo} alt="logo" />

      {/* <nav ref={navRef}> */}
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input" 
      />

      <button onClick={searchEventHandle} className="style-button">
        Search
      </button>

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
          {isAdmin && (
            <>
              {
                <Link className="navlink" to="/delete-recipes">
                  Delete Recipes
                </Link>
              }
              <Link className="navlink" to="/create-recipe">
                Create Recipe{" "}
              </Link>

              <Link className="navlink" to="/admin-control">
                Admin Control{" "}
              </Link>
            </>
          )}

          <Link className="navlink" to="/saved-recipes">
            Saved Recipes
          </Link>

          <Link className="navlink" to="/change-credentials">
            Change Credentials
          </Link>
          <button onClick={logout} className="style-button">
            Logout
          </button>
        </>
      )}
      {/* </nav> */}
    </header>
  );
};
