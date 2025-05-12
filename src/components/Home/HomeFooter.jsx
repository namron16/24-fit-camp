import React from "react";
import "./homefooter.css";

const HomeFooter = ({ slug }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {slug === "login" ? null : (
          <div className="footer-category">
            <div className="service-footer footer-category-items">
              <h3>Services</h3>
              <p>One on One Personal Training</p>
              <p>Muscle Gaining</p>
              <p>Athlete Training</p>
              <p>Weight Management</p>
              <p>Yoga Fitness</p>
              <p>Boxing</p>
            </div>
            <div className="pricing-footer footer-category-items">
              <h3>Pricing</h3>
              <p>Regular</p>
              <p>Student</p>
              <p>Personal</p>
            </div>
            <div className="company-footer footer-category-items">
              <h3>Company</h3>
              <p>About us</p>
              <p>Carrers</p>
              <p>Customers</p>
              <p>Partners</p>
            </div>
          </div>
        )}
        <div className="footer-socials">
          <a href="https://www.facebook.com/FITCAMP.tagum">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/24FitCamp_Playground">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="mailto:Coachdon@gmail.com" className="email">
            Coachdon@gmail.com
          </a>
          <a
            href="https://www.flaticon.com/free-icons/google"
            title="google icons"
            className="flaticon"
          >
            Google icons created by Freepik - Flaticon
          </a>
        </div>
        <p className="copyright">
          <span>&copy;</span> 2025 24-Fit Camp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default HomeFooter;
