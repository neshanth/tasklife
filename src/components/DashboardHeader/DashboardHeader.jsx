import React from "react";
import useAppContext from "../../hooks/useAppContext";
import logo from "../../assets/Images/v2/logo.png";
import "./dashboardheader.css";
import Icons from "../Icons/Icons";

const DashboardHeader = () => {
  const { handleMobileNavToggle } = useAppContext();
  return (
    <div className="tl-mobile-header">
      <img src={logo} alt="logo" width="122px" />
      <div className="tl-hamburger-icon" onClick={handleMobileNavToggle}>
        <Icons type="hamburger" />
      </div>
    </div>
  );
};

export default DashboardHeader;
