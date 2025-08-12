import React, { useMemo } from "react";
import { useFetchMembers, useFetchTrainers } from "../../hooks/FetchData";
import Chart from "./Chart";
import ReactCalendar from "./Calendar";

import "./statistics.css";

const Statistics = () => {
  const { members } = useFetchMembers();
  const { trainers } = useFetchTrainers();

  const activeMembers = useMemo(() => {
    return members?.data?.filter((member) => member.isActive)?.length || 0;
  }, [members?.data]);

  const totalMembers = useMemo(
    () => members?.data?.length || 0,
    [members?.data]
  );
  const totalTrainers = useMemo(
    () => trainers?.data?.length || 0,
    [trainers?.data]
  );

  return (
    <section className="stats">
      <div className="stats-container">
        <div className="stat-items">
          <div className="stats-detail">
            <span className="stat-number">{totalMembers}</span>
            <span>Members</span>
          </div>
          <div className="stat-item-icon stat-1">
            <i className="fa-solid fa-users"></i>
          </div>
        </div>
        <div className="stat-items">
          <div className="stats-detail">
            <span className="stat-number">{totalTrainers}</span>
            <span>Trainers</span>
          </div>
          <div className="stat-item-icon stat-2">
            <i className="fa-solid fa-dumbbell"></i>
          </div>
        </div>
        <div className="stat-items">
          <div className="stats-detail">
            <span className="stat-number">{activeMembers}</span>
            <span>Active Users</span>
          </div>
          <div className="stat-item-icon stat-3">
            <i className="fa-solid fa-bolt"></i>
          </div>
        </div>
        <Chart />
        <div className="calendar">
          <ReactCalendar />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
