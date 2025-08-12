import React, { useState } from "react";
import MemberHeader from "../../components/members/MemberHeader";
import MemberMenu from "../../components/members/MemberMenu";
import { Outlet } from "react-router-dom";
import "./memberLayout.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useTheme } from "../../hooks/useMemberTheme";

const MembersLayout = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className="members-main" id={theme}>
        <MemberHeader />
        <div className="member__container">
          <aside className="members__menu">
            <MemberMenu />
          </aside>
          <div className="members__content">
            <Outlet />
          </div>
        </div>
      </main>
    </ThemeContext.Provider>
  );
};

export default MembersLayout;
