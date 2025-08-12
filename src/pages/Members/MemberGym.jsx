import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./memberGym.css";
import Loading2 from "../../components/Loading/Loading2";
import { useFetchMember } from "../../hooks/FetchData";
import { useFetchRewards } from "../../hooks/FetchData";

import usePageTransition from "../../hooks/usePageTransition";

const MemberGym = () => {
  const { member } = useFetchMember();
  const memberDetails = member?.data?.[0];
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
      gymPoints: memberDetails?.points,
    }),
    [memberDetails]
  );

  const date = new Date(value.membershipStart);
  const formatDate = date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const { rewards } = useFetchRewards();

  const { isPending, showContent } = usePageTransition(0);
  if (!showContent || isPending) return <Loading2 />;
  return (
    <section className="member-gym">
      <div className="rewards-header">
        <h1>Fitness Rewards</h1>
        <span>Member since {formatDate}</span>
        <div className="member-points">
          <span>Current Points</span>
          <div className="current-points">
            <i className="fa-solid fa-trophy"></i> {value.gymPoints}
          </div>
        </div>
      </div>
      <div className="member-rewards__nav">
        <NavLink
          to={"."}
          end
          className={({ isActive }) =>
            isActive ? "active-gym-link" : "inactive-gym-link"
          }
        >
          <i className="fa-solid fa-gift"></i>
          Rewards
        </NavLink>
        <NavLink
          to={"points-history"}
          className={({ isActive }) =>
            isActive ? "active-gym-link" : "inactive-gym-link"
          }
        >
          <i className="fa-solid fa-clock-rotate-left"></i>
          Points History
        </NavLink>
      </div>
      <div className="member-rewards__content">
        <Outlet />
      </div>
    </section>
  );
};

export default MemberGym;
