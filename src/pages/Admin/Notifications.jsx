import React, { useState } from "react";
import './notification.css'
const Notifications = () => {
  const [notifs, setNotifs] = useState([]);
  return (
    <section>
      {notifs.length === 0 && (
        <div className="no-notification">
          <i className="fa-solid fa-inbox"></i>
          <h4>All quiet for now</h4>
          <span>New notifications will appear here</span>
        </div>
      )}
    </section>
  );
};

export default Notifications;
