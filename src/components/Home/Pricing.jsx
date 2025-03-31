import React, { useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import "./pricing.css";
import { database } from "../../../database";
import ScrollReveal from "scrollreveal";

const Pricing = () => {
  useEffect(() => {
    ScrollReveal().reveal(".category", {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
      interval: 100,
      reset: false,
    });
  }, []);

  const categories = database.pricing.map((category) => (
    <div className="category" key={uuidV4()}>
      <span>{category.name}</span>
      {category.name !== "Personal"
        ? category.content.map((item) => (
            <div className="items" key={uuidV4()}>
              <p>₱{item.price}</p>
              <span>
                /{item.month} {`${item.month > 1 ? "months" : "month"}`}
              </span>
            </div>
          ))
        : category.content.map((item) => (
            <div className="items" key={uuidV4()}>
              <p>₱{item.price}</p>
              <span>/{item.session} session</span>
            </div>
          ))}
    </div>
  ));

  return (
    <section className="pricing" id="pricing">
      <h2>Pricing</h2>
      <div className="pricing-container">{categories}</div>
    </section>
  );
};

export default Pricing;
