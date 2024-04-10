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
      <Link to="/login" style={{textDecoration: 'none', fontSize: '14px', color: 'white', backgroundColor: '#BD0F17', borderRadius: '8px', padding: '10px 16px', fontFamily: 'Inter', fontWeight: '700'}}>
        Войти
      </Link>
    </div>
  );
};

export default Navbar;
