import React from "react";
import { createContext, useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";

import "./layout.css";

export const ThemeContext = createContext("light");
const Layout = () => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className="main" id={theme}>
        <Header />
        <div className="container">
          <aside className="menu-container">
            <Menu />
          </aside>
          <div className="content-container">
            <Outlet />
          </div>
        </div>
      </main>
    </ThemeContext.Provider>
  );
};

export default Layout;
