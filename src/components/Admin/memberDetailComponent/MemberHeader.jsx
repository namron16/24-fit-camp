import React from "react";
import { NavLink } from "react-router-dom";


const MemberHeader = () => {
  return (
    <div className="member-bg-overlay">
      <NavLink to=".." relative="path">
        <span>
          <i className="fa-solid fa-arrow-left"></i>
        </span>
        <span>Back to Members</span>
      </NavLink>
    </div>
  );
};

export default MemberHeader;
