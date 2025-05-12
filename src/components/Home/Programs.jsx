import React, { useEffect } from "react";
import dumbell from "../../assets/icons/dumbell.png";
import biceps from "../../assets/icons/biceps.png";
import athlete from "../../assets/icons/athlete.png";
import yoga from "../../assets/icons/yoga.png";
import ScrollReveal from "scrollreveal";
import "./programs.css";

const Programs = () => {
  useEffect(() => {
    ScrollReveal().reveal(".program-list", {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
      interval: 100,
      reset: false,
    });
  }, []);

  return (
    <section className="programs" id="programs">
      <div className="program-intro">
        <h3>Our Program</h3>
        <h2>
          <span className="program-span">Build Your</span> Best Body
        </h2>
      </div>
      <div className="program-list-container">
        <div className="program-list">
          <div className="overlay">
            <img src={dumbell} alt="dumbell icon" />
            <span>Personal Training</span>
          </div>

          <p>
            Get one-on-one coaching tailored to your fitness goals. Our personal
            trainers design custom workout plans, guide you through every
            session, and keep you motivated every step of the way.
          </p>
        </div>
        <div className="program-list">
          <div className="overlay">
            <img src={biceps} alt="muscle icon" />
            <span>Muscle Gaining</span>
          </div>
          <p>
            Ready to build serious strength and size? Our muscle gaining program
            uses progressive weight training and proper nutrition guidance to
            help you gain lean mass and maximize your physical potential.
          </p>
        </div>
        <div className="program-list">
          <div className="overlay">
            <img src={athlete} alt="athlete icon" />
            <span>Athlete</span>
          </div>
          <p>
            Built for aspiring and professional athletes, this program focuses
            on strength, speed, agility, and endurance training to help you
            perform at your peak, whether you're on the court, field, or track.
          </p>
        </div>
        <div className="program-list">
          <div className="overlay">
            <img src={yoga} alt="yoga icon" />
            <span>Yoga Fitness</span>
          </div>
          <p>
            Find your balance, flexibility, and inner strength. Our yoga fitness
            classes blend traditional poses with fitness-focused movements to
            help improve your mobility, relieve stress, and boost overall
            well-being.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Programs;
