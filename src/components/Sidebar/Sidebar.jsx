import React from "react";
import logo from "../../assets/Images/v2/logo.png";
import "./sidebar.css";
import useAppContext from "../../hooks/useAppContext";
import Icons from "../Icons/Icons";
import Navigation from "./Navigation/Navigation";
import Profile from "./Profile/Profile";

function Sidebar({ handleClose, logout }) {
  const { showMobileNav, setShow, user, isMobile } = useAppContext();

  const handleClick = () => {
    setShow(false);
  };

  const handleSidebarForMobile = () => {
    window.innerWidth <= 1024 ? setShow(false) : setShow(true);
  };

  return (
    <>
      <aside className="tl-sidebar">
        {!isMobile && <DesktopContent user={user} logout={logout} handleSidebarForMobile={handleSidebarForMobile} />}
        {showMobileNav && <MobileContent user={user} logout={logout} handleSidebarForMobile={handleSidebarForMobile} />}
      </aside>
    </>
  );

  // return (
  //   // <>
  //   //   <Offcanvas className="sidebar" show={show} tabIndex="" onHide={handleClose} backdrop={false}>
  //   //     <Offcanvas.Header className="border-bottom">
  //   //       <img alt="logo" src={logo} className="logo" />
  //   //       <CloseButton handleClick={handleClick} />
  //   //     </Offcanvas.Header>
  //   //     <Offcanvas.Body>
  //   //       <div className={`d-flex text-white align-items-center sidebar-link ${location.pathname === "/dashboard/stats" ? "sidebar-link-active" : ""}`}>
  //   //         <NavLink onClick={handleSidebarForMobile} to="/dashboard/stats">
  //   //           <PieIcon />
  //   //           Stats
  //   //         </NavLink>
  //   //       </div>
  //   //       <div className={`d-flex text-white align-items-center sidebar-link ${location.pathname === "/dashboard/tasks" ? "sidebar-link-active" : ""}`}>
  //   //         <NavLink onClick={handleSidebarForMobile} to="/dashboard/tasks">
  //   //           <ListIcon />
  //   //           My Tasks
  //   //         </NavLink>
  //   //       </div>
  //   //       <div className="d-flex text-white align-items-center logout-menu" onClick={logout}>
  //   //         <LogoutIcon />
  //   //         <p className="mb-0">Logout</p>
  //   //       </div>
  //   //     </Offcanvas.Body>
  //   //   </Offcanvas>
  //   // </>
  // );
}

const DesktopContent = ({ logout, user, handleSidebarForMobile }) => {
  return (
    <>
      <img src={logo} alt="logo" width="122px" />
      <Profile user={user} />
      <Navigation handleSidebarForMobile={handleSidebarForMobile} />
      <Logout logout={logout} />
    </>
  );
};

const MobileContent = ({ logout, user, handleSidebarForMobile }) => {
  return (
    <div className="sidebar-mobile">
      <div className="sidebar-mobile-profile">
        <Profile user={user} />
      </div>
      <Navigation handleSidebarForMobile={handleSidebarForMobile} />
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
