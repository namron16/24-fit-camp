import React, { useState } from "react";
import MembershipForm from "./MembershipForm";
import DayPassForm from "./DayPassForm";
import "./membershipModal.css";

const MembershipModal = ({ dialogRef }) => {
  const [currStep, setCurrStep] = useState("selection");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setCurrStep(option === "full-membership" ? "full-membership" : "day-pass");
  };

  const handleCloseModal = () => {
    dialogRef.current.close();
    setCurrStep("selection");
  };
  return (
    <dialog ref={dialogRef} className="membership-option-modal">
      <span onClick={() => handleCloseModal()} className="close-modal">
        x
      </span>
      {currStep === "selection" && (
        <>
          <div className="membership-option__header">
            <h2>Choose your Membership Option</h2>
            <span>Select the option that best fits your fitness goals</span>
          </div>
          <div className="membership-option-container">
            <button
              className="day-pass"
              onClick={() => handleOptionSelect("day-pass")}
            >
              <div className="membership-option">
                <div className="membership-option-icon">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div className="membership-option__content">
                  <h3>Day Pass</h3>
                  <span>Perfect for trying us out</span>
                </div>
              </div>
            </button>
            <button
              className="full-membership"
              onClick={() => handleOptionSelect("full-membership")}
            >
              <div className="membership-option">
                <div className="membership-option-icon">
                  <i className="fa-solid fa-user-group"></i>
                </div>
                <div className="membership-option__content">
                  <h3>Full Membership</h3>
                  <span>Unlimited access and benefits</span>
                </div>
              </div>
            </button>
          </div>
        </>
      )}
      {currStep === "day-pass" && (
        <DayPassForm
          slug="day-pass"
          setCurrStep={setCurrStep}
          handleCloseModal={handleCloseModal}
        />
      )}
      {currStep === "full-membership" && (
        <MembershipForm
          slug="member"
          setCurrStep={setCurrStep}
          handleCloseModal={handleCloseModal}
        />
      )}
    </dialog>
  );
};

export default MembershipModal;
