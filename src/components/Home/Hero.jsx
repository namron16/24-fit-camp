import React from "react";
import HomeHeader from "./HomeHeader";
import "./hero.css";
import dumbellModel from "../../assets/24fitcamp/dumbell-model.png";
import stibin from '../../assets/24fitcamp/stibin.png'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <HomeHeader />
      <div className="hero-container">
        <div className="hero-intro">
          <h1>Welcome to</h1>
          <span>24-fit camp</span>
          <p>
          24-Fit Camp is a community-driven fitness center located on Bonifacio Street, Philippines, dedicated to helping individuals reach their health and wellness goals. With a focus on functional training, group workouts, and personalized coaching, 24-Fit Camp combines energy, support, and results in a friendly, no-judgment environment.
          </p>
          <button className="hero-button">
            Get Started <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        <img src={dumbellModel} alt="dumbell" className="dumbellModel" />
        {/* <img src={stibin} alt="dumbell" className="dumbellModel" /> */}
      </div>
    </section>
  );
};

export default Hero;
