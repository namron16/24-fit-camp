import React, {useEffect} from "react";
import Slider from "./Slider";
import { database } from "../../../database";
import "./products.css";
import ScrollReveal from "scrollreveal";

const Products = () => {

  
  useEffect(() => {
    ScrollReveal().reveal('.product-intro', {
      origin: 'right',
      distance: '50px',
      duration: 1000,
      delay: 100,
      reset: false,
    });
  }, []);
  
  const products = database.products

  return (
    <section className="products" id="products">
      <div className="product-intro">
        <h2 className="product-span">24-fit camp</h2>
        <p className="product-header">
          <span>merchandise</span>
          <span className="product-header-span"> & </span>products
        </p>
      </div>
      <Slider products={products}/>
    </section>
  );
};

export default Products;
