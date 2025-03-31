import React from "react";
import "./header.css";
import logo from "../../assets/24-fitcamp-logo.png";

const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="logo">
        <img src={logo} alt="24 fit camp logo" />
        <span>24-Fit Camp</span>
      </div>
      <nav>
        <div className="user">
          <span>Hey, Admin</span>
          <i className="fa-solid fa-circle-user admin-icon"></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
