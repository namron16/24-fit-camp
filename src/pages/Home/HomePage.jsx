import React from "react";
import "./homepage.css";
import HomeFooter from "../../components/Home/HomeFooter";
import Hero from "../../components/Home/Hero";
import About from "../../components/Home/About";
import Programs from "../../components/Home/Programs";
import Products from "../../components/Home/Products";
import TopButton from "../../components/Home/TopButton";
import Pricing from "../../components/Home/Pricing";

const HomePage = () => {
  return (
    <div className="home">
      <main className="home-main">
        <TopButton />
        <Hero />
        <About />
        <Programs />
        <Products />
        <Pricing />
      </main>
      <HomeFooter />
    </div>
  );
};

export default HomePage;
