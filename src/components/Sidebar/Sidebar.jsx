import React, { useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import { logout } from "../../utils/utils";
import "./sidebar.css";

function Sidebar({ handleClose }) {
  const { show, setShow } = useContext(UserContext);

  const handleSidebarForMobile = () => {
    window.innerWidth <= 1024 ? setShow(false) : setShow(true);
  };

  return (
    <>
      <Offcanvas className="sidebar" show={show} tabIndex="" onHide={handleClose} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>TaskLife</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="sidebar-link">
            <Link onClick={handleSidebarForMobile} to="/dashboard">
              Dashboard
            </Link>
          </div>
          <div className="sidebar-link">
            <Link onClick={handleSidebarForMobile} to="/dashboard/tasks">
              My Tasks
            </Link>
          </div>
          <div className="logout-btn d-flex justify-content-center">
            <button onClick={logout} className="btn btn-danger mx-auto">
              Logout
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
