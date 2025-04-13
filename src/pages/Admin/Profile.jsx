import React from "react";
import "./profile.css";

const Profile = () => {
  return (
    <section className="profile">
      <div className="profile-overlay">
        <div className="profile__img">
          <i className="fa-solid fa-circle-user"></i>
        </div>
      </div>
    
      <div className="admin-detail__section">
        <span className="admin-name">Namron Pontillo</span>
        <span className="admin-email">namron@example.com</span>
      </div>
    </section>
  );
};

export default Profile;
