import React from "react";
import "./gymOverview.css";
import { useFetchMembers } from "../../../utils/FetchData";
import icon from "../../../assets/user-avatar-filled-alt.svg";

const GymOverview = () => {
  const { members } = useFetchMembers();
  const sortedMembers = members?.data
    ?.sort((a, b) => b.points - a.points)
    .slice(0, 5);

  return (
    <section className="overview">
      <div className="overview-header">
        <h2 className="overview-title">
          <i className="fa-solid fa-trophy"></i>
          Top Performing Members
        </h2>
        <span>The Top 5 members with the highest gym points</span>
      </div>
      <div className="overview-content">
        <div className="overview-container">
          {sortedMembers.map((member, index) => (
            <div className="overview-items" key={member.id}>
              <div className="overview-details">
                <div className="rank">#{index + 1}</div>
                <div className="avatar">
                  <img src={member.img || icon} alt={member.firstName} />
                </div>
                <div className="name">
                  <span>{member.firstName} {member.lastName}</span>
                </div>
              </div>
              <div className="points">
                <span>{member.points} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GymOverview;
