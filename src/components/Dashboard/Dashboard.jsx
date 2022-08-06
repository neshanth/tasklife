import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./dashboard.css";

function Dashboard() {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div className={`${show ? "dashboard" : "container"}`}>
      <Sidebar show={show} handleClose={handleClose} />
      <Outlet />
    </div>
  );
}

export default Dashboard;
