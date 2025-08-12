import React from "react";
import { useAddTrainer } from "../../../hooks/FetchData";
import { v4 as uuidV4 } from "uuid";
import { useForm } from "@tanstack/react-form";
import "./trainerModal.css";

const TrainerModal = ({ dialogRef }) => {
  const { addTrainer } = useAddTrainer();

  const trainerDefaultValues = {
    name: "",
    email: "",
    contact: "",
  };
  const form = useForm({
    defaultValues: trainerDefaultValues,
    onSubmit: async ({ value }) => {
      const errors = await form.validate();
      if (Object.keys(errors).length > 0) {
        console.log("Validation failed, modal stays open", errors);
        return;
      }

      const newTrainer = { ...value, id: uuidV4() };
      addTrainer(newTrainer);
      form.reset();
      dialogRef.current?.close();

      form.reset();
      dialogRef.current?.close();
    },
  });

  return (
    <dialog ref={dialogRef}>
      <button
        onClick={() => dialogRef.current?.close()}
        autoFocus
        className="close-modal"
      >
        <i className="fa-solid fa-circle-xmark"></i>
      </button>
      <h1>Add new Trainer</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="form-field">
          <form.Field
            name="firstName"
            validators={{
              onChange: ({ value }) =>
                value.trim() === "" ? "First name is required" : undefined,
            }}
            children={(field) => (
              <div className="item">
                <label htmlFor="firstName">First Name:</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <em>{String(field.state.meta.errors.join(", "))}</em>
                )}
              </div>
            )}
          />
          <form.Field
            name="lastName"
            validators={{
              onChange: ({ value }) =>
                value.trim() === "" ? "Last name is required" : undefined,
            }}
            children={(field) => (
              <div className="item">
                <label htmlFor="lastName">last Name:</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <em>{String(field.state.meta.errors.join(", "))}</em>
                )}
              </div>
            )}
          />

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !regex.test(value.trim())
                  ? "Please enter a valid email"
                  : undefined;
              },
            }}
            children={(field) => (
              <div className="item">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <em>{String(field.state.meta.errors.join(", "))}</em>
                )}
              </div>
            )}
          />

          <form.Field
            name="contact"
            validators={{
              onChange: ({ value }) => {
                const phNumberRegex =
                  /^(\+63|0)[9]\d{9}$|^(\+63|0)(2|3|8)\d{7,8}$/;
                if (!value.trim()) {
                  return "Contact number is required";
                } else if (!phNumberRegex.test(value)) {
                  return "Please enter a valid Philippine contact number (e.g., 09123456789, +639123456789)";
                }
                return undefined;
              },
            }}
            children={(field) => (
              <div className="item">
                <label htmlFor="contact">Contact:</label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <em>{String(field.state.meta.errors.join(", "))}</em>
                )}
              </div>
            )}
          />
        </div>

        <button type="submit" className="add-trainer-btn">
          Add Trainer
        </button>
      </form>
    </dialog>
  );
};

export default TrainerModal;
