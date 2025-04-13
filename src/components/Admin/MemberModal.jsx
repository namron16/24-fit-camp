import React from "react";
import { useAddMember } from "../../utils/FetchData";
import { v4 as uuidV4 } from "uuid";
import { useForm } from "@tanstack/react-form";
import "./modal.css";

const MemberModal = ({ dialogRef, slug }) => {
  const { addMember } = useAddMember();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      plan: "",
      contact: "",
    },
    onSubmit: async ({ value }) => {
      const errors = await form.validate();
      if (Object.keys(errors).length > 0) {
        console.log("Validation failed, modal stays open", errors);
        return;
      }

      const newMember = { ...value, id: uuidV4(), isActive: true };
      addMember(newMember);
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
      <h1>Add new {slug}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="form-field">
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.trim() === "" ? "Full name is required" : undefined,
            }}
            children={(field) => (
              <div className="item">
                <label htmlFor="name">Full Name:</label>
                <input
                  id="name"
                  name="name"
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

          <form.Field
            name="plan"
            validators={{
              onChange: ({ value }) =>
                value ? undefined : "Please select a plan",
            }}
            children={(field) => (
              <div className="item">
                <label htmlFor="plan">Plan:</label>
                <select
                  id="plan"
                  name="plan"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                >
                  <option value="">-- Select a Plan --</option>
                  <option value="regular">Regular</option>
                  <option value="student">Student</option>
                  <option value="personal">Personal</option>
                </select>
                {field.state.meta.errors.length > 0 && (
                  <em>{String(field.state.meta.errors.join(", "))}</em>
                )}
              </div>
            )}
          />
        </div>

        <button type="submit" className="add-member-btn">
          Add {slug}
        </button>
      </form>
    </dialog>
  );
};

export default MemberModal;
