import React, { useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/context";
import { logout } from "../../utils/utils";
import CloseButton from "../../assets/Icons/CloseButton";
import logo from "../../assets/Images/tasklife__logo-white.png";
import "./sidebar.css";
import LogoutIcon from "../../assets/Icons/LogoutIcon";

function Sidebar({ handleClose }) {
  const { show, setShow } = useContext(UserContext);

  const handleClick = () => {
    setShow(false);
  };

  const handleSidebarForMobile = () => {
    window.innerWidth <= 1024 ? setShow(false) : setShow(true);
  };

  const activeStyles = {
    backgroundColor: "var(--primary-color)",
  };

  return (
    <>
      <Offcanvas className="sidebar" show={show} tabIndex="" onHide={handleClose} backdrop={false}>
        <Offcanvas.Header className="border-bottom">
          <img alt="logo" src={logo} width="100" />
          <CloseButton handleClick={handleClick} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="sidebar-link">
            <NavLink style={({ isActive }) => (isActive ? activeStyles : null)} onClick={handleSidebarForMobile} to="/dashboard/stats">
              Stats
            </NavLink>
          </div>
          <div className="sidebar-link">
            <NavLink style={({ isActive }) => (isActive ? activeStyles : null)} onClick={handleSidebarForMobile} to="/dashboard/tasks">
              My Tasks
            </NavLink>
          </div>
          {/* <div className="logout-btn d-flex justify-content-center">
            <button onClick={logout} className="btn btn-danger mx-auto">
              Logout
            </button>
          </div> */}
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
