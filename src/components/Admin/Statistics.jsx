import React from "react";
import { FetchMembers, FetchTrainers } from "../../utils/FetchData";
import Chart from "./Chart";
import Loading from "../Loading/Loading";
import ReactCalendar from "./Calendar";
import "./statistics.css";
const Statistics = () => {
  const { members, loadingMembers, isErrorMembers, errorMembers } =
    FetchMembers();
  const { trainers, loadingTrainers, isErrorTrainers, errorTrainers } =
    FetchTrainers();

  const activeMembers =
    members?.data?.filter((member) => member.isActive)?.length || 0;

  return (
    <section className="stats">
      {loadingMembers && loadingTrainers ? (
        <Loading />
      ) : (
        <div className="stats-container">
          <div className="stat-items">
            <div className="stats-detail">
              <span className="stat-number">{members?.data.length}</span>
              <span>Members</span>
            </div>
            <div className="stat-item-icon">
              <i className="fa-solid fa-users-rectangle"></i>
            </div>
          </div>
          <div className="stat-items">
            <div className="stats-detail">
              <span className="stat-number">{trainers?.data.length}</span>
              <span>Trainers</span>
            </div>
            <div className="stat-item-icon">
              <i className="fa-solid fa-dumbbell"></i>
            </div>
          </div>
          <div className="stat-items">
            <div className="stats-detail">
              <span className="stat-number">{activeMembers}</span>
              <span>Active Users</span>
            </div>
            <div className="stat-item-icon">
              <i className="fa-solid fa-bolt"></i>
            </div>
          </div>
          <Chart />
          <div className="calendar">
            <ReactCalendar />
          </div>
        </div>
      )}
    </section>
  );
};

export default Statistics;
