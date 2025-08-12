import React from "react";
import userIcon from "../../../assets/user-avatar-filled-alt.svg";
import { NavLink } from "react-router-dom";
import "./memberHeader.css";

const MemberHeader = ({ profileImage, firstName, lastName, email }) => {
  return (
    <>
      <NavLink to=".." relative="path">
        <span>
          <i className="fa-solid fa-arrow-left"></i>
        </span>
        <span>Back to Members</span>
      </NavLink>
      <div className="member-info-details__container">
        <div className="member-info-details">
          <img
            src={profileImage || userIcon}
            className="members-detail-icon"
            loading="lazy"
            alt="Member avatar"
          />
          <div className="member-name-email">
            <span className="member-name">{`${firstName} ${lastName}`}</span>
            <span className="member-email">{`${email}`}</span>
          </div>
        </div>
        <div className="update-membership">
          <button className="update-membership__btn">Update Membership</button>
        </div>
      </div>
    </>
  );
};

export default MemberHeader;
