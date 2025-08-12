import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useAddRewards } from "../../../hooks/FetchData";
import { v4 as uuidV4 } from "uuid";
import "./rewardsModal.css";

const RewardsModal = ({ rewardsRef }) => {
  const { addRewards } = useAddRewards();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      points: 100,
    },
    onSubmit: async ({ value }) => {
      const errors = await form.validate();
      if (Object.keys(errors).length > 0) {
        console.log("Validation failed, modal stays open", errors);
        return;
      }
      const newReward = { ...value, id: uuidV4() };
      addRewards(newReward);

      form.reset();
      rewardsRef.current?.close();
    },
  });

  const handleCloseModal = () => {
    setTimeout(() => {
      form.reset({
        touched: false,
        errors: false,
      });
    }, 0);

    rewardsRef.current?.close();
  };
  return (
    <dialog ref={rewardsRef} className="rewards-modal">
      <h1>Add New Reward</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => {
              return value.trim() === ""
                ? "reward name is required"
                : undefined;
            },
          }}
        >
          {(field) => (
            <div className="form-items">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
                placeholder="e.g., Product Discount"
              />
              {field.state.meta.errors.length > 0 && (
                <em>{String(field.state.meta.errors.join(", "))}</em>
              )}
            </div>
          )}
        </form.Field>
        <form.Field
          name="description"
          validators={{
            onChange: ({ value }) => {
              return value.trim() === ""
                ? "rewards description is required"
                : undefined;
            },
          }}
        >
          {(field) => (
            <div className="form-items">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
                placeholder="Describe the rewards.."
              ></textarea>
              {field.state.meta.errors.length > 0 && (
                <em>{String(field.state.meta.errors.join(", "))}</em>
              )}
            </div>
          )}
        </form.Field>
        <form.Field
          name="points"
          validators={{
            onChange: ({ value }) => {
              return value < 0 ? "points are required" : undefined;
            },
          }}
        >
          {(field) => (
            <div className="form-items">
              <label htmlFor="points">Points</label>
              <input
                type="number"
                id="points"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.valueAsNumber);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <em>{String(field.state.meta.errors.join(", "))}</em>
              )}
            </div>
          )}
        </form.Field>
        <div className="form-actions">
          <button className="cancel-btn" onClick={handleCloseModal}>
            Cancel
          </button>
          <button type="submit" className="rewards-add-btn">
            Add Reward
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default RewardsModal;
