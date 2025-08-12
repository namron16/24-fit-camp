import React from "react";
import "./tabsHeader.css";
const TabsHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div className="member-detail__tabs">
      <button
        className={activeTab === "info" ? "active-tab" : "inactive-tab"}
        onClick={() => setActiveTab("info")}
      >
        Info
      </button>
      <button
        className={activeTab === "transaction" ? "active-tab" : "inactive-tab"}
        onClick={() => setActiveTab("transaction")}
      >
        Transaction
      </button>
    </div>
  );
};

export default TabsHeader;
