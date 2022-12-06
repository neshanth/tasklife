import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../context/context";
import Sidebar from "../Sidebar/Sidebar";
import Container from "react-bootstrap/Container";
import "./dashboard.css";

function Dashboard() {
  const { show, setShow } = useContext(UserContext);
  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className={`${show ? "dashboard" : "container"}`}>
      <Sidebar show={show} handleClose={handleClose} />
      <Container className="my-2">
        <Outlet />
      </Container>
    </div>
  );
}

export default Dashboard;
