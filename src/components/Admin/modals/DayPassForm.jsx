import React from "react";
import { useAddMember } from "../../../hooks/FetchData";
import { v4 as uuidV4 } from "uuid";
import nextId from "react-id-generator";
import { useForm } from "@tanstack/react-form";
import { useFormatDate } from "../../../hooks/useFormatDate";
import { useCalculateDayPass } from "../../../hooks/useCalculateDayPass";
import "./dayPassForm.css";

const DayPassForm = ({ setCurrStep, handleCloseModal }) => {
  const [selectedPrograms, setSelectedPrograms] = React.useState([]);
  const { addMember } = useAddMember();
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
    },
    onSubmit: async ({ value }) => {
      const errors = await form.validate();
      if (Object.keys(errors).length > 0) {
        console.log("Validation failed, modal stays open", errors);
        return;
      }

      const newTransaction = {
        id: nextId("TRX-"),
        name: value.firstName + " " + value.lastName,
        type: "day pass",
        amount: useCalculateDayPass(value.type, value.sessionPlans),
        date: useFormatDate(new Date()),
      };

      const newMember = {
        ...value,
        id: uuidV4(),
        transaction: [newTransaction],
      };

      addMember(newMember);
      form.reset();
      handleCloseModal();
      windows.alert("Member added successfully");
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
    <div className="day-pass-form">
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
              onChange: ({ value }) => {
                value ? undefined : "First name is required";
              },
            }}
          >
            {(field) => (
              <div className="item">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <em>{String(field.state.meta.errors.join(", "))}</em>
                )}
              </div>
            )}
          </form.Field>
          <form.Field
            name="lastName"
            validators={{
              onChange: ({ value }) => {
                value ? undefined : "Last name is required";
              },
            }}
          >
            {(field) => (
              <div className="item">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <em>{String(field.state.meta.errors.join(", "))}</em>
                )}
              </div>
            )}
          </form.Field>
          <form.Field
            name="contact"
            validators={{
              onChange: ({ value }) => {
                value ? undefined : "Contact number is required";
              },
            }}
          >
            {(field) => (
              <div className="item">
                <label htmlFor="contact">Contact:</label>
                <input
                  type="text"
                  id="contact"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <em>{String(field.state.meta.errors.join(", "))}</em>
                )}
              </div>
            )}
          </form.Field>
          <form.Field
            name="type"
            validators={{
              onChange: ({ value }) => {
                value ? undefined : "Membership Type is required";
              },
            }}
          >
            {(field) => (
              <div className="item">
                <label htmlFor="contact">Membership Type:</label>
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
          </form.Field>
          {/* <form.Field
            name="program"
            validators={{
              onChange: ({ value }) => {
                value ? undefined : "Membership Program is required";
              },
            }}
          >
            {(field) => (
              <div className="item">
                <label htmlFor="contact">Membership Program:</label>
                <select
                  name="type"
                  id="type"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                >
                  <option value="">--Select Program--</option>
                  <option value="muscle gaining">Muscle Gaining</option>
                  <option value="yoga fitness">Yoga Fitness</option>
                  <option value="athlete training">Athelete Training</option>
                  <option value="personal training">Personal Training</option>
                  <option value="boxing">Boxing</option>
                </select>
                {field.state.meta.errors.length > 0 && (
                  <em>{String(field.state.meta.errors.join(", "))}</em>
                )}
              </div>
            )}
          </form.Field> */}
          <form.Field
            name="program"
            validators={{
              onChange: ({ value }) => undefined,
            }}
          >
            {(field) => (
              <div className="item">
                <span>Available Programs:</span>
                <div className="checkbox">
                  {[
                    "muscle gaining",
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
          {/* Muscle Gaining */}
          {selectedPrograms.includes("muscle gaining") && (
            <form.Field
              name={`sessionPlans_muscleGaining`}
              validators={{
                onChange: ({ value }) =>
                  value ? undefined : "Select session for Muscle Gaining",
              }}
            >
              {(field) => (
                <div className="item">
                  <label htmlFor="muscleGainingSession">
                    Muscle Gaining Sessions:
                  </label>
                  <select
                    id="muscleGainingSession"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      handleSessionChange("muscle gaining", e.target.value);
                    }}
                  >
                    <option value="">--Select--</option>
                    <option value="1 session">1 session</option>
                  </select>
                  {field.state.meta.errors.length > 0 && (
                    <em>{String(field.state.meta.errors.join(", "))}</em>
                  )}
                </div>
              )}
            </form.Field>
          )}
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
        </div>
        <button type="submit" className="add-member-btn">
          Add Member
        </button>
      </form>
    </div>
  );
};

export default DayPassForm;
