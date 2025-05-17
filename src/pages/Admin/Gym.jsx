import React from "react";
import { Outlet } from "react-router-dom";
import GymHeader from "../../components/Admin/GymComponent/GymHeader";
import Loading from "../../components/Loading/Loading";
import usePageTransition from "../../utils/usePageTransition";
import "./gym.css";

const Gym = () => {
  const { isPending, showContent } = usePageTransition(500);

  if (isPending || !showContent) return <Loading />;

  return (
    <section className="gym">
      <GymHeader />
      <div className="gym-container">
        <Outlet />
      </div>
    </section>
  );
};

export default Gym;
