import React from "react";
import "./Error.css";

const Error = ({ resetErrorBoundary }) => {
  return (
    <div className="error">
      <div className="error__container">
        <div className="error-icon">
          <i className="fa-solid fa-circle-exclamation"></i>
          <h1>Something went wrong!!</h1>
        </div>
        <button onClick={resetErrorBoundary} className="reset-btn">
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
