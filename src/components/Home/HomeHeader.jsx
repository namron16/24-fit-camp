import React, { useRef, useState } from "react";
import logo from "../../assets/24-fitcamp-logo.png";
import HamburgerMenu from "./HamburgerMenu";
import "./homeheader.css";

const HomeHeader = () => {
  const navRef = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <header className="home-header">
      <nav className="nav">
        <div className="home-logo">
          <a href="#home">
            <img src={logo} alt="24 fit camp logo" />
          </a>
          <span>24-Fit Camp</span>
        </div>
        <ul className={`links ${open ? "active-nav" : ""}`} ref={navRef}>
          <li>
            <a href="#home" onClick={() => setOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#programs" onClick={() => setOpen(false)}>
              Programs
            </a>
          </li>
          <li>
            <a href="#products" onClick={() => setOpen(false)}>
              Products
            </a>
          </li>
          <li>
            <a href="#pricing" onClick={() => setOpen(false)}>
              Pricing
            </a>
          </li>
          <div className="sign-in">Sign-in</div>
        </ul>
        <HamburgerMenu navRef={navRef} open={open} setOpen={setOpen} />
      </nav>
    </header>
  );
};

export default HomeHeader;
