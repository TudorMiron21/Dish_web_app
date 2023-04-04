import { Link } from "react-router-dom";

import logo from "../images/logo.png"

export const NavBar =()=>
{
    return <div className="navbar">
        <img class="logo" src={logo} alt="logo"/>
        <Link className="navlink" to="/"> Home </Link>
        <Link className="navlink" to="/register"> Register </Link>
        <Link className="navlink" to="/login"> Login </Link>
        <Link className="navlink" to="/create-recipe"> Create Recipe </Link>
        <Link className="navlink" to="/saved-recipes"> Saved Recipes </Link>

    </div>;
}