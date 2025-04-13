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
        <span className="category__span">Main Menu</span>
        <NavLink
          to={"/admin"}
          style={({ isActive }) => (isActive ? style : null)}
          end
        >
          <i className="fa-solid fa-house"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={"gym-management"}
          style={({ isActive }) => (isActive ? style : null)}
        >
          <i className="fa-solid fa-dumbbell"></i>
          <span>Gym</span>
        </NavLink>
        <NavLink
          to={"trainers"}
          style={({ isActive }) => (isActive ? style : null)}
        >
          <i className="fa-solid fa-users-gear"></i>
          <span>Trainers</span>
        </NavLink>
        <NavLink
          to={"members"}
          style={({ isActive }) => (isActive ? style : null)}
        >
          <i className="fa-solid fa-users"></i>
          <span>Members</span>
        </NavLink>
        <NavLink
          to={"notifications"}
          style={({ isActive }) => (isActive ? style : null)}
        >
          <div className="notifications">
            <i className="fa-regular fa-bell"></i>
            {notif.length > 0 && <div className="notif">3</div>}
          </div>
          <span>Notifications</span>
        </NavLink>
      </div>
      <div className="settings">
        <span className="category__span">Settings</span>
        <NavLink
          to={"admin-profile"}
          style={({ isActive }) => (isActive ? style : null)}
        >
          <i className="fa-regular fa-circle-user"></i>
          <span>Profile</span>
        </NavLink>
        <NavLink
          to={"settings"}
          style={({ isActive }) => (isActive ? style : null)}
        >
          <i className="fa-solid fa-gear"></i>
          <span>Settings</span>
        </NavLink>
        <NavLink
          to={"logout"}
          style={({ isActive }) => (isActive ? style : null)}
          className={"log-out"}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Log out</span>
        </NavLink>
      </div>
    </section>
  );
};

export default Menu;
