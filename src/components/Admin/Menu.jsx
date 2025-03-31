import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./menu.css";

const Menu = () => {
  const [notif, setNotif] = useState([]);
  const style = {
    transform: "translateX(10px)",
    backgroundColor: "var(--dark-bg-)",
    borderRadius: "30px",
    color: "#fff",
    transition: "all 0.3s",
  };
  return (
    <section className="menu">
      <div className="main-menu">
        <span>Main Menu</span>
        <NavLink
          to={"/admin"}
          style={({ isActive }) => (isActive ? style : null)}
          end
        >
          <i className="fa-solid fa-house"></i>
          Dashboard
        </NavLink>
        <NavLink
          to={"gym-management"}
          style={({ isActive }) => (isActive ? style : null)}
        >
          <i className="fa-solid fa-dumbbell"></i>
          Gym
        </NavLink>
        <NavLink
          to={"trainers"}
          style={({ isActive }) => (isActive ? style : null)}
        >
          <i className="fa-solid fa-users-gear"></i>
          Trainers
        </NavLink>
        <NavLink
          to={"members"}
          style={({ isActive }) => (isActive ? style : null)}
        >
          <i className="fa-solid fa-users"></i>
          Members
        </NavLink>
        <NavLink
          to={"notifications"}
          style={({ isActive }) => (isActive ? style : null)}
        >
          <div className="notifications">
            <i className="fa-regular fa-bell"></i>
            {notif.length > 0 && <div className="notif">3</div>}
          </div>
          Notifications
        </NavLink>
      </div>
      <div className="settings">
        <span>Settings</span>
        <NavLink
          to={"admin-profile"}
          style={({ isActive }) => (isActive ? style : null)}
        >
          <i className="fa-regular fa-circle-user"></i>
          Profile
        </NavLink>
        <NavLink
          to={"settings"}
          style={({ isActive }) => (isActive ? style : null)}
        >
          <i className="fa-solid fa-gear"></i>
          Settings
        </NavLink>
        <NavLink
          to={"logout"}
          style={({ isActive }) => (isActive ? style : null)}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </NavLink>
      </div>
    </section>
  );
};

export default Menu;
