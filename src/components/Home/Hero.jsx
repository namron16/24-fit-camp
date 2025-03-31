import React from "react";
import HomeHeader from "./HomeHeader";
import "./hero.css";
import dumbellModel from "../../assets/24fitcamp/dumbell-model.png";

const Hero = () => {
  return (
    <section className="hero" id="home">
      <HomeHeader />
      <div className="hero-container">
        <div className="hero-intro">
          <h1>Welcome to</h1>
          <span>24-fit camp</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            error impedit iste enim ipsum, esse eligendi quo. Porro ut culpa
            sint deserunt iure ex enim nobis libero explicabo, autem
            repudiandae!
          </p>
          <button className="hero-button">
            Get Started <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        <img src={dumbellModel} alt="dumbell" className="dumbellModel" />
      </div>
    </section>
  );
};

export default Hero;
