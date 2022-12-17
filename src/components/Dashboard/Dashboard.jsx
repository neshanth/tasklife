import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../context/context";
import Sidebar from "../Sidebar/Sidebar";
import Container from "react-bootstrap/Container";
import "./dashboard.css";
import DashboardHeader from "../DashboardHeader/DashboardHeader";

function Dashboard() {
  const { show, setShow } = useContext(UserContext);
  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className={`${show ? "dashboard" : "container"}`}>
      <Sidebar show={show} handleClose={handleClose} />
      <Container className="p-0">
        <DashboardHeader />
        <div className="dashboard-wrapper">
          <Outlet />
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
