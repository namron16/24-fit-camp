import React, { memo } from "react";
import Header from "./Header";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useTheme } from "../../hooks/useTheme";

import "./layout.css";

const Layout = () => {
  const { theme, toggleTheme } = useTheme();

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

export default memo(Layout);
