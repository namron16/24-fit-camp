import React from "react";

const TypeColor = (value) => {
  if (value === "regular") {
    return <span style={{ color: "gray" }}>Regular</span>;
  }

  if (value === "student") {
    return <span style={{ color: "blue" }}>Student</span>;
  }

  if (value === "personal") {
    return <span style={{ color: "purple" }}>Personal</span>;
  }

  return null; // ✅ catch-all return
};

export { TypeColor };
