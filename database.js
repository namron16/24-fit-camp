import product1 from "./src/assets/24fitcamp/product-1.png";
import product2 from "./src/assets/24fitcamp/product-2.png";
import product3 from "./src/assets/24fitcamp/product-3.png";
import product4 from "./src/assets/24fitcamp/product-4.png";
import product5 from "./src/assets/24fitcamp/product-5.png";
import product6 from "./src/assets/24fitcamp/product-6.png";

export const database = {
  pricing: [
    {
      name: "Regular",
      content: [
        {
          month: 1,
          price: 1000,
        },
        {
          month: 3,
          price: 2700,
        },
        {
          month: 6,
          price: 4500,
        },
        ,
        {
          month: 12,
          price: 6500,
        },
      ],
    },

    {
      name: "Student",
      content: [
        {
          month: 1,
          price: 600,
        },
        {
          month: 3,
          price: 1500,
        },
        {
          month: 6,
          price: 3000,
        },
        ,
        {
          month: 12,
          price: 5400,
        },
      ],
    },
    {
      name: "Personal",
      content: [
        {
          session: 12,
          price: 6000,
        },
        {
          session: 15,
          price: 7000,
        },
      ],
    },
  ],


  products: [
    {
      id: 1,
      name: "A1 PROTEIN",
      img: product1,
    },
    {
      id: 2,
      name: "24-FIT CAMP T-SHIRT",
      img: product2,
    },
    {
      id: 3,
      name: "24-FIT CAMP JERSEY",
      img: product3,
    },
    {
      id: 4,
      name: "WHEYL SALTED CHOCOLATE PROTEIN POWDER",
      img: product4,
    },
    {
      id: 5,
      name: "ATHLENE VANILLA FOOD SUPPLEMENT",
      img: product5,
    },
    {
      id: 6,
      name: "ATHLENE CHOCOLATE FOOD SUPPLEMENT",
      img: product6,
    },
  ],
};
