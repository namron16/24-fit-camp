import React from "react";
import "./notificationCard.css";

const NotificationCard = () => {
  return (
    <div className="notification__card">
      <span className="notification-initial">J</span>
      <div className="notification-details">
        <h4>John Doe</h4>
        <span>Subscribed to the gym</span>
      </div>
    </div>
  );
};

export default NotificationCard;
