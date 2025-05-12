import React from "react";
import "./notFound.css";
import sad from "../../assets/icons/sad-face.webp";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <div className="not-found-message">
          <h1>Oops!</h1>
          <h2>We can't seem to find the page you're looking for.</h2>
          <p>Error code: 404</p>
        </div>
        <div className="not-found__img">
          <img src={sad} alt="sad icon" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
