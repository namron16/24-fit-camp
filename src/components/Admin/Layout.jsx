import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";
import './layout.css'
const Layout = () => {
  return (
    <div className="main">
      <Header />
      <div className="container">
        <aside className="menu-container">
          <Menu />
        </aside>
        <main className="content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
