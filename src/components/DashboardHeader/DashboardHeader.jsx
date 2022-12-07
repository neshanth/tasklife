import React, { useContext } from "react";
import Hamburger from "../Hamburger/Hamburger";
import { UserContext } from "../../context/context";
import "./dashboardheader.css";

const DashboardHeader = () => {
  const { handleSidebarToggle } = useContext(UserContext);
  return (
    <div className="d-flex justify-content-between align-items-center dashboard-header border-bottom">
      <p className="title mb-0">Dashboard</p>
      <Hamburger handleSidebarToggle={handleSidebarToggle} />
    </div>
  );
};

export default DashboardHeader;
