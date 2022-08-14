import React, { useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import "./sidebar.css";

function Sidebar({ handleClose }) {
  const { show, setShow } = useContext(UserContext);

  const handleSidebarForMobile = () => {
    window.innerWidth <= 1024 ? setShow(false) : setShow(true);
  };

  return (
    <>
      <Offcanvas className="sidebar" show={show} onHide={handleClose} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>TaskLife</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="sidebar-link">
            <Link onClick={handleSidebarForMobile} to="/dashboard/tasks">
              My Tasks
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
