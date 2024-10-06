import React from "react";
import logo from "../../assets/Images/v2/logo.png";
import "./sidebar.scss";
import useAppContext from "../../hooks/useAppContext";
import Icons from "../Icons/Icons";
import Navigation from "./Navigation/Navigation";
import Profile from "./Profile/Profile";

function Sidebar({ logout, handleTaskForm }) {
  const { user, isMobile, handleMobileNavToggle, showMobileNav } = useAppContext();

  const commonProps = {
    user,
    logout,
    handleTaskForm,
  };

  return (
    <>
      <aside className="tl-sidebar">
        {!isMobile && <DesktopContent {...commonProps} />}
        {<MobileContent {...commonProps} handleMobileNavToggle={handleMobileNavToggle} showMobileNav={showMobileNav} />}
      </aside>
    </>
  );
}

const DesktopContent = ({ logout, user, handleTaskForm }) => {
  return (
    <div className="sidebar-desktop">
      <img src={logo} alt="logo" width="122px" />
      <Profile user={user} />
      <Navigation handleMobileNavToggle={() => {}} handleTaskForm={handleTaskForm} />
      <Logout logout={logout} />
    </div>
  );
};

const MobileContent = ({ logout, user, handleMobileNavToggle, showMobileNav, handleTaskForm }) => {
  return (
    <div className={`sidebar-mobile ${showMobileNav ? "visible" : "hidden"}`}>
      <div className="sidebar-mobile-profile">
        <Profile user={user} />
        <div className="sidebar-mobile-close" onClick={handleMobileNavToggle}>
          <Icons type="close" />
        </div>
      </div>
      <Navigation handleMobileNavToggle={handleMobileNavToggle} />
      <Logout logout={logout} />
    </div>
  );
};

const Logout = ({ logout }) => {
  return (
    <div className="logout" onClick={logout}>
      <p className="tl-padding logout-text">
        <Icons type="logout" />
        Logout
      </p>
    </div>
  );
};

export default Sidebar;
