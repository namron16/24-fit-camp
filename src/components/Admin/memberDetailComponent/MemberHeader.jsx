import React from "react";
import { NavLink } from "react-router-dom";
import userIcon from "../../../assets/user-avatar-filled-alt.svg";

const MemberHeader = ({ profileImage }) => {
  return (
    <div className="member-bg-overlay">
      <NavLink to=".." relative="path">
        <span>
          <i className="fa-solid fa-arrow-left"></i>
          
        </span>
        <span>Back to Members</span>
      </NavLink>
      <img
        src={profileImage || userIcon}
        className="members-detail-icon"
        loading="lazy"
        alt="Member avatar"
      />
    </div>
  );
};

export default MemberHeader;
