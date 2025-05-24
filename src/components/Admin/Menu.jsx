import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./menu.css";

const Menu = () => {
  const [notif, setNotif] = useState([]);
  return (
    <section className="menu">
      <div className="main-menu">
        <span className="category__span">Main Menu</span>
        <NavLink
          to={"/admin"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
          end
        >
          <i className="fa-solid fa-house"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={"gym-management"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <i className="fa-solid fa-dumbbell"></i>
          <span>Gym</span>
        </NavLink>
        <NavLink
          to={"trainers"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <i className="fa-solid fa-users-gear"></i>
          <span>Trainers</span>
        </NavLink>
        <NavLink
          to={"member"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <i className="fa-solid fa-users"></i>
          <span>Members</span>
        </NavLink>
        <NavLink
          to={"notifications"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
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
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <i className="fa-regular fa-circle-user"></i>
          <span>Profile</span>
        </NavLink>
        <NavLink
          to={"settings"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <i className="fa-solid fa-gear"></i>
          <span>Settings</span>
        </NavLink>
        <NavLink to={"logout"} className={"log-out"}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Log out</span>
        </NavLink>
      </div>
    </section>
  );
};

export default Menu;
