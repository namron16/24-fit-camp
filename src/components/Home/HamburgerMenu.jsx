import React from "react";
import { Spin as Hamburger } from "hamburger-react";
import "./hamburger.css";

const HamburgerMenu = ({ navRef, open, setOpen }) => {
  return (
    <button className="burger-menu">
      <Hamburger
        label="show menu"
        size={20}
        color="#fff"
        toggled={open}
        toggle={setOpen}
      />
    </button>
  );
};

export default HamburgerMenu;
