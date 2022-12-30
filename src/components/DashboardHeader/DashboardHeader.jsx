import React, { useContext } from "react";
import Hamburger from "../Hamburger/Hamburger";
import { UserContext } from "../../context/context";
import "./dashboardheader.css";

const DashboardHeader = () => {
  const { handleSidebarToggle, user } = useContext(UserContext);
  return (
    <div className="d-flex justify-content-between align-items-center dashboard-header border-bottom">
      <Hamburger handleSidebarToggle={handleSidebarToggle} />
      <p className="title mb-0">Hi, {user.name}</p>
    </div>
  );
};

export default DashboardHeader;
