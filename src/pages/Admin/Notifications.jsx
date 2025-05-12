import React, { useState } from "react";
import NotificationCard from "../../components/Admin/NotificationCard";
import "./notification.css";
const Notifications = () => {
  const [notifs, setNotifs] = useState(1);
  return (
    <section className="notifications__section">
      {notifs === 0 ? (
        <div className="no-notification__section">
          <div className="no-notification">
            <i className="fa-solid fa-inbox"></i>
            <h4>All quiet for now</h4>
            <span>New notifications will appear here</span>
          </div>
        </div>
      ) : (
        <div className="notification__section">
          <h1>Notifications</h1>
          <span className="recent-activity">Recent activity from your Gym</span>
          <div className="notifications__container">
            <NotificationCard />
          </div>
        </div>
      )}
    </section>
  );
};

export default Notifications;
