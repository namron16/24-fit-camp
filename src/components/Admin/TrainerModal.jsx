import React, { useState } from "react";
import { AddTrainer } from "../../utils/FetchData";
import { v4 as uuidV4 } from "uuid";
import "./modal.css";
const TrainerModal = ({ dialogRef, slug, columns }) => {
  const { addTrainer } = AddTrainer();

  const [trainer, setTrainer] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrainer = { ...trainer, id: uuidV4() };
    addTrainer(newTrainer);
    dialogRef.current?.close();
    setTrainer({
      name: "",
      email: "",
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
              item.field !== "isActive" &&
              item.field !== "id"
          )
          .map((column) => (
            <div className="item" key={column.field}>
              <label>{column.headerName}</label>
              <input
                value={trainer[column.field]}
                onChange={(e) =>
                  setTrainer({ ...trainer, [column.field]: e.target.value })
                }
              />
            </div>
          ))}
        <button className="add-member-btn">Add {slug}</button>
      </form>
    </dialog>
  );
};

export default TrainerModal;
