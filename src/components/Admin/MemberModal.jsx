import React, { useState } from "react";
import { AddMember } from "../../utils/FetchData";
import { v4 as uuidV4 } from "uuid";
import "./modal.css";
const MemberModal = ({ dialogRef, slug, columns }) => {
  const { addMember } = AddMember();

  const [member, setMember] = useState({
    name: "",
    email: "",
    plan: "",
    contact: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = { ...member, id: uuidV4(), isActive: true };
    addMember(newMember);
    dialogRef.current?.close();
    setMember({
      name: "",
      id: "",
      email: "",
      plan: "",
      contact: "",
    });
  };

  return (
    <dialog ref={dialogRef}>
      <button
        onClick={() => dialogRef.current?.close()}
        autoFocus
        className="close-modal"
      >
        <i className="fa-solid fa-circle-xmark"></i>
      </button>
      <h1>Add new {slug}</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        {columns
          .filter(
            (item) =>
              item.field !== "actions" &&
              item.field !== "icon" &&
              item.field !== "isActive"
          )
          .map((column) => (
            <div className="item" key={column.field}>
              <label>{column.headerName}</label>
              <input
                value={member[column.field]}
                onChange={(e) =>
                  setMember({ ...member, [column.field]: e.target.value })
                }
              />
            </div>
          ))}
        <button className="add-member-btn">Add {slug}</button>
      </form>
    </dialog>
  );
};

export default MemberModal;
