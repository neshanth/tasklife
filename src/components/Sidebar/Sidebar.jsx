import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar({ show, handleClose }) {
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
