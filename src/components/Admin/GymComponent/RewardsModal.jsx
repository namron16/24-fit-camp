import React, { useState } from "react";
import "./postmodal.css";
import { v4 as uuidV4 } from "uuid";

const RewardsModal = ({ rewardsRef }) => {
  return (
    <dialog ref={rewardsRef} className="postModal">
      <h1>this is the rewards modal</h1>
    </dialog>
  );
};

export default RewardsModal;
