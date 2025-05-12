import React from "react";
import "./profile.css";
import { useFetchAdmins } from "../../utils/FetchData";

const Profile = () => {
  const { admins } = useFetchAdmins();

  const value = {
    firstName: admins?.data[0].firstName,
    lastName: admins?.data[0].lastName,
    email: admins?.data[0].email,
    id: admins?.data[0].id,
  };
  return (
    <section className="profile">
      <div className="profile-overlay">
        <div className="profile__img">
          <i className="fa-solid fa-circle-user"></i>
        </div>
      </div>

      <div className="admin-detail__section">
        <span className="admin-name">{`${value.firstName} ${value.lastName}`}</span>
        <span className="admin-email">Email: {value.email}</span>
        <span className="admin-email">Admin ID: {value.id}</span>
      </div>
    </section>
  );
};

export default Profile;
