import React, { useMemo } from "react";
import "./memberMenu.css";
import { NavLink } from "react-router-dom";
import { useFetchMember } from "../../hooks/FetchData";
import usePageTransition from "../../hooks/usePageTransition";
import Loading2 from "../Loading/Loading2";

const MemberMenu = () => {
  const { isPending, showContent } = usePageTransition(0);
  const { member } = useFetchMember();
  const memberDetails = useMemo(() => member?.data?.[0], [member]);

  const value = useMemo(
    () => ({
      firstName: memberDetails?.firstName,
      lastName: memberDetails?.lastName,
      email: memberDetails?.email,
      contact: memberDetails?.contact,
      type: memberDetails?.type,
      plan: memberDetails?.plan,
      membershipStart: memberDetails?.membershipStart,
      membershipEnd: memberDetails?.membershipEnd,
      profileImage: memberDetails?.profileImage,
    }),
    [memberDetails]
  );

  if (!showContent || isPending) return <Loading2 />;

  return (
    <section className="member-menu">
      <div className="member-details-menu">
        {value.profileImage ? (
          <img
            src={value.profileImage}
            className="member-profile__img"
            loading="lazy"
          />
        ) : (
          <i className="fa-solid fa-circle-user member-img"></i>
        )}
        <span className="member-name">{`${value.firstName} ${value.lastName}`}</span>
        <span className="member-email">{value.email}</span>
      </div>

      <div className="member-main-menu">
        <NavLink
          to={"."}
          className={({ isActive }) => (isActive ? "active" : "")}
          end
        >
          <i className="fa-solid fa-chart-simple"></i>
          <span>Overview</span>
        </NavLink>
        <NavLink
          to={"rewards"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-solid fa-dumbbell"></i>
          <span>Gym</span>
        </NavLink>
        <NavLink
          to={"member-profile"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-regular fa-circle-user"></i>
          <span>Profile</span>
        </NavLink>
        <NavLink
          to={"member-notifications"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="notifications">
            <i className="fa-regular fa-bell"></i>
          </div>
          <span>Notifications</span>
        </NavLink>
        <NavLink
          to={"member-settings"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-solid fa-gear"></i>
          <span>Settings</span>
        </NavLink>
      </div>
    </section>
  );
};

export default MemberMenu;
