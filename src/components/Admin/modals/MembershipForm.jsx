import React from "react";
import { useAddMember } from "../../../hooks/FetchData";
import { v4 as uuidV4 } from "uuid";
import nextId from "react-id-generator";
import { useForm } from "@tanstack/react-form";
import { useFormatDate } from "../../../hooks/useFormatDate";
import { useCalculateMembership } from "../../../hooks/useCalculateMembership";
import "./membershipForm.css";

const MembershipForm = ({ setCurrStep, handleCloseModal }) => {
  const { addMember } = useAddMember();
  const [selectedPrograms, setSelectedPrograms] = React.useState([]);

  const form = useForm({
    defaultValues: {
      firstName: "Nam",
      lastName: "Dale",
      email: "nam@example.com",
      contact: "09876543212",
      program: [],
      type: "student",
      plan: "",
      sessionPlans: [],
      isActive: true,
      notified: false,
      points: 10,
      membershipStartDate: useFormatDate(new Date()),
    },
    onSubmit: async ({ value }) => {
      const errors = await form.validate();
      if (Object.keys(errors).length > 0) {
        console.log("Validation failed, modal stays open", errors);
        return;
      }
      const membershipStartDate = new Date(value.membershipStartDate);
      const match = value.plan.match(/(\d+)/);
      const duration = match ? parseInt(match[1], 10) : 1;
      const membershipEndDate = new Date(membershipStartDate);
      membershipEndDate.setMonth(membershipEndDate.getMonth() + duration);

      const newTransaction = {
        id: nextId("TRX-"),
        // id: uuidV4(),
        name: value.firstName + " " + value.lastName,
        type: "membership",
        amount: useCalculateMembership(
          value.type,
          value.plan,
          value.sessionPlans
        ),
        date: useFormatDate(membershipStartDate),
      };

      const newMember = {
        ...value,
        id: uuidV4(),
        membershipEndDate: useFormatDate(membershipEndDate),
        transaction: [newTransaction],
        program: [value.program],
      };
      addMember(newMember);
      form.reset();
      handleCloseModal();
      alert("Member added successfully");
    },
  });

  const handleSessionChange = (program, session) => {
    const current = form.getFieldValue("sessionPlans") || [];

    const updated = current.filter((item) => item.program !== program);

    if (session) {
      form.setFieldValue("sessionPlans", [...updated, { program, session }]);
    } else {
      form.setFieldValue("sessionPlans", updated);
    }
  };

  return (
    <div className="membership-form">
      <button
        onClick={() => setCurrStep("selection")}
        autoFocus
        className="back-btn"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
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
                  <option value="">--Select Type--</option>
                  <option value="regular">Regular</option>
                  <option value="student">Student</option>
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
                value ? undefined : "Select a Membership Plan",
            }}
          >
            {(field) => (
              <div className="item">
                <label htmlFor="plan">Membership Plan:</label>
                <select
                  id="plan"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                >
                  <option value="">--Select Membership Plan--</option>
                  <option value="1 month">1 month</option>
                  <option value="3 month">3 month</option>
                  <option value="6 month">6 month</option>
                  <option value="12 month">12 month</option>
                </select>
                {field.state.meta.errors.length > 0 && (
                  <em>{String(field.state.meta.errors.join(", "))}</em>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="program"
            validators={{
              onChange: ({ value }) => undefined,
            }}
          >
            {(field) => (
              <div className="item">
                <span>Additional Programs:</span>
                <div className="checkbox">
                  {[
                    // "muscle gaining",
                    "athlete training",
                    "yoga fitness",
                    "personal training",
                    "boxing",
                  ].map((prog) => (
                    <label key={prog} htmlFor={prog}>
                      {prog
                        .split(" ")
                        .map((word) => word[0].toUpperCase() + word.slice(1))
                        .join(" ")}
                      <input
                        type="checkbox"
                        id={prog}
                        name={prog}
                        value={prog}
                        checked={field.state.value.includes(prog)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...field.state.value, e.target.value]
                            : field.state.value.filter(
                                (v) => v !== e.target.value
                              );

                          field.handleChange(updated);

                          setSelectedPrograms(updated);

                          if (!e.target.checked) {
                            handleSessionChange(prog, "");
                          }
                        }}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </form.Field>

          {/* Yoga Fitness */}
          {selectedPrograms.includes("yoga fitness") && (
            <form.Field
              name={`sessionPlans_yoga`}
              validators={{
                onChange: ({ value }) =>
                  value ? undefined : "Select session for Yoga",
              }}
            >
              {(field) => (
                <div className="item">
                  <label htmlFor="yogaSession">Yoga Fitness Sessions:</label>
                  <select
                    id="yogaSession"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      handleSessionChange("yoga fitness", e.target.value);
                    }}
                  >
                    <option value="">--Select--</option>
                    <option value="1 session">1 session</option>
                    <option value="10 session">10 session</option>
                  </select>
                  {field.state.meta.errors.length > 0 && (
                    <em>{String(field.state.meta.errors.join(", "))}</em>
                  )}
                </div>
              )}
            </form.Field>
          )}

          {/* Athlete Training */}
          {selectedPrograms.includes("athlete training") && (
            <form.Field
              name={`sessionPlans_athlete`}
              validators={{
                onChange: ({ value }) =>
                  value ? undefined : "Select session for Athlete Training",
              }}
            >
              {(field) => (
                <div className="item">
                  <label htmlFor="athleteSession">
                    Athlete Training Sessions:
                  </label>
                  <select
                    id="athleteSession"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      handleSessionChange("athlete training", e.target.value);
                    }}
                  >
                    <option value="">--Select--</option>
                    <option value="1 session">1 session</option>
                    <option value="12 session">12 session</option>
                    <option value="15 session">15 session</option>
                  </select>
                  {field.state.meta.errors.length > 0 && (
                    <em>{String(field.state.meta.errors.join(", "))}</em>
                  )}
                </div>
              )}
            </form.Field>
          )}

          {/* Personal Training */}
          {selectedPrograms.includes("personal training") && (
            <form.Field
              name={`sessionPlans_personal`}
              validators={{
                onChange: ({ value }) =>
                  value ? undefined : "Select session for Personal Training",
              }}
            >
              {(field) => (
                <div className="item">
                  <label htmlFor="personalSession">
                    Personal Training Sessions:
                  </label>
                  <select
                    id="personalSession"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      handleSessionChange("personal training", e.target.value);
                    }}
                  >
                    <option value="">--Select--</option>
                    <option value="1 session">1 session</option>
                    <option value="12 session">12 session</option>
                    <option value="15 session">15 session</option>
                  </select>
                  {field.state.meta.errors.length > 0 && (
                    <em>{String(field.state.meta.errors.join(", "))}</em>
                  )}
                </div>
              )}
            </form.Field>
          )}

          <form.Field
            name="membershipStartDate"
            validators={{
              onChange: ({ value }) =>
                value ? undefined : "Please select a start Date",
            }}
          >
            {(field) => (
              <div className="item">
                <label htmlFor="membershipStartDate">Start Date:</label>
                <input
                  id="membershipStartDate"
                  name="membershipStartDate"
                  type="date"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <em>{String(field.state.meta.errors.join(", "))}</em>
                )}
              </div>
            )}
          </form.Field>
        </div>

        <button type="submit" className="add-member-btn">
          Add Member
        </button>
      </form>
    </div>
  );
};

export default MembershipForm;
