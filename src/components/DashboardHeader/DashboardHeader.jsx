import React from "react";
import Hamburger from "../Hamburger/Hamburger";
import useAppContext from "../../hooks/useAppContext";
import logo from "../../assets/Images/v2/logo.png";
import "./dashboardheader.css";

const DashboardHeader = () => {
  const { handleSidebarToggle } = useAppContext();
  return (
    <div className="tl-mobile-header">
      <img src={logo} alt="logo" width="122px" />
      <Hamburger handleSidebarToggle={handleSidebarToggle} />
    </div>
  );
};

export default DashboardHeader;
