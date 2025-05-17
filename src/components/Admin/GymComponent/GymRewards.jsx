import React, { useRef } from "react";
import RewardsModal from "./RewardsModal";
import "./gymRewards.css";
import { useFetchRewards } from "../../../utils/FetchData";

const GymRewards = () => {
  const { rewards } = useFetchRewards();
  const rewardsRef = useRef(null);

  const handleRewardsModal = () => {
    rewardsRef.current.showModal();
  };

  const displayedRewards = rewards?.data?.map((reward) => {
    return (
      <div className="rewards-items" key={reward.id}>
        <div className="rewards-items__container">
          <div className="rewards-details">
            <span className="reward-name">{reward.name}</span>
            <span className="reward-description">{reward.description}</span>
          </div>
          <div className="rewards-points">
            <span>{reward.points} pts</span>
          </div>
        </div>
        <div className="rewards-actions">
          <button className="edit-reward">
            <i className="fa-solid fa-pen"></i>Edit
          </button>
          <button className="delete-reward">
            <i className="fa-solid fa-trash"></i>Delete
          </button>
        </div>
      </div>
    );
  }).reverse();
  return (
    <section className="rewards">
      <div className="rewards-header">
        <div className="rewards-header__container">
          <h2 className="rewards-title">
            <i className="fa-solid fa-gift"></i>
            Gym Rewards
          </h2>
          <span>Manage rewards for your gym members</span>
        </div>
        <div className="rewards-btn">
          <button onClick={handleRewardsModal}>
            <span>+</span> Add Reward
          </button>
        </div>
      </div>
      <div className="rewards-content">
        <div className="rewards-container">
          {rewards?.data?.length > 0 ? (
            displayedRewards
          ) : (
            <h3>
              No member rewards yet. You can create rewards for your gym members
            </h3>
          )}
        </div>
      </div>
      <RewardsModal rewardsRef={rewardsRef} />
    </section>
  );
};

export default GymRewards;
