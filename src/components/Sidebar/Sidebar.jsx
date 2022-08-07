import React, { useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import "./sidebar.css";

function Sidebar({ handleClose }) {
  const { show } = useContext(UserContext);
  return (
    <>
      <Offcanvas className="sidebar" show={show} onHide={handleClose} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>TaskLife</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link to="/dashboard/tasks">My Tasks</Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
