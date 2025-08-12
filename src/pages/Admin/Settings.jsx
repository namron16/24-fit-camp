import React from "react";
import ToggleButton from "../../components/Admin/ToggleButton";
import "./settings.css";
import { useForm } from "@tanstack/react-form";
import { useFetchAdmins } from "../../hooks/FetchData";
import { useEditAdmin } from "../../hooks/FetchData";

const Settings = () => {
  const { admins } = useFetchAdmins();
  const adminId = admins?.data[0]?.id;
  const { editAdmin } = useEditAdmin(adminId);

  const form = useForm({
    defaultValues: admins?.data[0] || {
      email: "",
      firstName: "",
      lastName: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const editedAdmin = { ...value };
        await editAdmin(editedAdmin);
        alert("Admin updated successfully");
      } catch (error) {
        alert("Failed to upated admin");
      }
    },
  });

  return (
    <section className="settings__section">
      <div className="personal-details__section">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="details__form"
        >
          <h3>Personal Details</h3>
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
              <div className="details__form-items">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={field.state.value}
                  // value={adminEmail}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
                {field.state.meta.errors.length > 0 && (
                  <em>{field.state.meta.errors.join(", ")}</em>
                )}
              </div>
            )}
          />

          <form.Field
            name="firstName"
            validators={{
              onChange: ({ value }) => {
                return value.trim() === ""
                  ? "first name is required"
                  : undefined;
              },
            }}
            children={(field) => (
              <div className="details__form-items">
                <label htmlFor="firstName">First name:</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
                {field.state.meta.errors.length > 0 && (
                  <em>{field.state.meta.errors.join(", ")}</em>
                )}
              </div>
            )}
          />

          <form.Field
            name="lastName"
            validators={{
              onChange: ({ value }) => {
                return value.trim() === ""
                  ? "last name is required"
                  : undefined;
              },
            }}
            children={(field) => (
              <div className="details__form-items">
                <label htmlFor="lastName">Last name:</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
                {field.state.meta.errors.length > 0 && (
                  <em>{field.state.meta.errors.join(", ")}</em>
                )}
              </div>
            )}
          />

          <button className="settings__btn">Save</button>
        </form>
      </div>
      <div className="settings-password__section">
        <h3>Reset Password</h3>
        <button className="reset-password__btn">Reset Password</button>
      </div>
      <div className="settings-theme__section">
        <h3>Theme</h3>
        <ToggleButton />
      </div>
    </section>
  );
};

export default Settings;
