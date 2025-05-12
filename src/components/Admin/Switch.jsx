import React, { useState } from "react";
import "./switch.css";
import { useEditMember } from "../../utils/FetchData";
import { useFetchMembersDetail } from "../../utils/FetchData";

const Switch = ({ memberId }) => {
  const { memberDetails } = useFetchMembersDetail(memberId);

  const isActive = memberDetails?.data?.isActive;

  const { editMember } = useEditMember(memberId);
  const handleEditStatus = () => {
    const newStatus = { ...memberDetails?.data, isActive: !isActive}
    editMember(newStatus);
  };
  return (
    <label className="switch">
      <input type="checkbox" checked={isActive} onChange={handleEditStatus} />
      {/* <div className={`slider ${isActive ? "active" : "inactive"}`}></div> */}
      <div className="slider">
        <div
          className={`slider-background ${isActive ? "active" : "inactive"}`}
        ></div>
        <div
          className={`slider-thumb ${
            isActive ? "thumb-active" : "thumb-inactive"
          }`}
        ></div>
      </div>
    </label>
  );
};

export default Switch;
