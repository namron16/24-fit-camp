import React from "react";
import "./Error.css";

const Error = () => {
  return (
    <div className="error">
      <div className="error-icon">
        <i className="fa-solid fa-circle-exclamation"></i>
      </div>
      <div>
        <h1>Oh no!</h1>
        <h2>something went wrong ☹</h2>
      </div>
    </div>
  );
};

export default Error;
