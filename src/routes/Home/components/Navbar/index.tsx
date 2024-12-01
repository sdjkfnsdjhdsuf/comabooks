import React from "react";
import "./index.css";
import logo from "assets/logo customize.svg";
import shopicon from "assets/shop.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
    </div>
  );
};

export default Navbar;
