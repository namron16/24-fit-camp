import React from "react";
import { useAddMember } from "../../utils/FetchData";
import { useAddTrainer } from "../../utils/FetchData";
import { v4 as uuidV4 } from "uuid";
import { useForm } from "@tanstack/react-form";
import "./modal.css";

const MemberModal = ({ dialogRef, slug }) => {
  const { addMember } = useAddMember();

  const { addTrainer } = useAddTrainer();
  const memberDefaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    plan: "",
    contact: "",
  };

  const trainerDefaultValues = {
    name: "",
    email: "",
    contact: "",
  };
  const form = useForm({
    defaultValues:
      slug === "members" ? memberDefaultValues : trainerDefaultValues,
    onSubmit: async ({ value }) => {
      const errors = await form.validate();
      if (Object.keys(errors).length > 0) {
        console.log("Validation failed, modal stays open", errors);
        return;
      }

      if (slug === "member") {
        const membershipStart = new Date();
        const membershipEnd = new Date();
        const match = value.plan.match(/(\d+)/);
        const duration = match ? parseInt(match[1], 10) : 1;
        membershipEnd.setMonth(membershipStart.getMonth() + duration);

        const newMember = {
          ...value,
          id: uuidV4(),
          isActive: true,
          membershipStart: membershipStart.toISOString(),
          membershipEnd: membershipEnd.toISOString(),
          notified: false,
          points: 10,
        };
        addMember(newMember);
      } else if (slug === "trainer") {
        const newTrainer = { ...value, id: uuidV4() };
        addTrainer(newTrainer);
        form.reset();
        dialogRef.current?.close();
      }

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
          {slug === "member" && (
            <>
              <form.Field
                name="type"
                validators={{
                  onChange: ({ value }) =>
                    value ? undefined : "Please select membership type",
                }}
                children={(field) => (
                  <div className="item">
                    <label htmlFor="type">Membership Type:</label>
                    <select
                      name="type"
                      id="type"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    >
                      <option value="">--Select Membership Type--</option>
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
                      <option value="1 month">1 month</option>
                      <option value="3 months">3 months</option>
                      <option value="6 months">6 months</option>
                      <option value="12 months">12 months</option>
                    </select>
                    {field.state.meta.errors.length > 0 && (
                      <em>{String(field.state.meta.errors.join(", "))}</em>
                    )}
                  </div>
                )}
              />
            </>
          )}
        </div>

        <button type="submit" className="add-member-btn">
          Add {slug}
        </button>
      </form>
    </dialog>
  );
};

export default MemberModal;
