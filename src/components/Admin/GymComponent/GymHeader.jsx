import React from "react";
import "./gymHeader.css";
import { NavLink } from "react-router-dom";

const GymHeader = () => {
  return (
    <div className="gym-header">
      <div className="gym-introduction">
        <div className="first-section">
          <div className="gym-title">
            <i className="fa-solid fa-dumbbell"></i>
            <span>Fitness Rewards</span>
          </div>
          <p>Manage your gym loyalty program and reward top members</p>
        </div>
        <div className="second-section">
          <span>24-Fit Camp</span>
          <span>Admin</span>
        </div>
      </div>
      <div className="gym-navigation">
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to={"."}
          end
        >
          Gym Overview
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to={"rewards"}
        >
          Manage Rewards
        </NavLink>
      </div>
    </div>
  );
};

export default GymHeader;
