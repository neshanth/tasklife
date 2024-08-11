import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useLocation } from "react-router-dom";
import CloseButton from "../../assets/Icons/CloseButton";
import logo from "../../assets/Images/v2/logo.png";
import "./sidebar.css";
import LogoutIcon from "../../assets/Icons/LogoutIcon";
import PieIcon from "../../assets/Icons/PieIcon";
import ListIcon from "../../assets/Icons/ListIcon";
import useAppContext from "../../hooks/useAppContext";
import Icons from "../Icons/Icons";
import Navigation from "./Navigation/Navigation";
import Profile from "./Profile/Profile";

function Sidebar({ handleClose, logout }) {
  const { show, setShow, user } = useAppContext();
  let location = useLocation();

  const handleClick = () => {
    setShow(false);
  };

  const handleSidebarForMobile = () => {
    window.innerWidth <= 1024 ? setShow(false) : setShow(true);
  };

  return (
    <aside className="tl-sidebar">
      <img src={logo} alt="logo" width="122px" />
      <Profile user={user} />
      <Navigation handleSidebarForMobile={handleSidebarForMobile} location={location} logout={logout} />
      <div className="logout" onClick={logout}>
        <p className="padding logout-text">
          <Icons type="logout" />
          Logout
        </p>
      </div>
    </aside>
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

export default Sidebar;
