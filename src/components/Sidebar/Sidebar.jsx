import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useLocation } from "react-router-dom";
import CloseButton from "../../assets/Icons/CloseButton";
import logo from "../../assets/Images/tasklife__logo-white.png";
import "./sidebar.css";
import LogoutIcon from "../../assets/Icons/LogoutIcon";
import PieIcon from "../../assets/Icons/PieIcon";
import ListIcon from "../../assets/Icons/ListIcon";
import useAuthContext from "../../hooks/useAuthContext";

function Sidebar({ handleClose, logout }) {
  const { show, setShow } = useAuthContext();
  let location = useLocation();

  const handleClick = () => {
    setShow(false);
  };

  const handleSidebarForMobile = () => {
    window.innerWidth <= 1024 ? setShow(false) : setShow(true);
  };

  return (
    <>
      <Offcanvas className="sidebar" show={show} tabIndex="" onHide={handleClose} backdrop={false}>
        <Offcanvas.Header className="border-bottom">
          <img alt="logo" src={logo} className="logo" />
          <CloseButton handleClick={handleClick} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={`d-flex text-white align-items-center sidebar-link ${location.pathname === "/dashboard/stats" ? "sidebar-link-active" : ""}`}>
            <NavLink onClick={handleSidebarForMobile} to="/dashboard/stats">
              <PieIcon />
              Stats
            </NavLink>
          </div>
          <div className={`d-flex text-white align-items-center sidebar-link ${location.pathname === "/dashboard/tasks" ? "sidebar-link-active" : ""}`}>
            <NavLink onClick={handleSidebarForMobile} to="/dashboard/tasks">
              <ListIcon />
              My Tasks
            </NavLink>
          </div>
          <div className="d-flex text-white align-items-center logout-menu" onClick={logout}>
            <LogoutIcon />
            <p className="mb-0">Logout</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
