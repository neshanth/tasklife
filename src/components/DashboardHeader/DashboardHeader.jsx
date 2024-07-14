import React from "react";
import Hamburger from "../Hamburger/Hamburger";
import useAppContext from "../../hooks/useAppContext";
import "./dashboardheader.css";

const DashboardHeader = () => {
  const { handleSidebarToggle, user } = useAppContext();
  return (
    <div className="d-flex justify-content-between align-items-center dashboard-header border-bottom">
      <Hamburger handleSidebarToggle={handleSidebarToggle} />
      <p className="title mb-0">Hi, {user.name}</p>
    </div>
  );
};

export default DashboardHeader;
