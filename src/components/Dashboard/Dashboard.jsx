import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../context/context";
import Sidebar from "../Sidebar/Sidebar";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import "./dashboard.css";
import api from "../../api/api";
import history from "../../history/history";
import Spinner from "../Spinner/Spinner";

function Dashboard() {
  const { show, setShow, setAuth } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      let response = await api.post("/api/logout", {});
      if (response.status === 200) {
        setAuth(false);
        setLoading(false);
        history.push("/");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className={`${show ? "dashboard" : ""}`}>
      <Sidebar show={show} logout={logout} handleClose={handleClose} />
      <DashboardHeader />
      <div className="dashboard-wrapper">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
