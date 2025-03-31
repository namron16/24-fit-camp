import React, { useEffect, useState } from "react";
import "./topbutton.css";

const TopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-btn ${visible ? "visible" : ""}`}
    >
      <i className="fa-solid fa-up-long"></i>
    </button>
  );
};

export default TopButton;
